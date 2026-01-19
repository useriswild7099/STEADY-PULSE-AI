import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import crypto from 'crypto';
import User from '../models/User';
import TokenBlacklist from '../models/TokenBlacklist';
import { authMiddleware } from '../middleware/auth';
import { validateRegistrationMiddleware, validatePasswordMiddleware } from '../middleware/validation';

const router = express.Router();

// Token expiration times
const ACCESS_TOKEN_EXPIRY = '1h'; // Short-lived access token
const REFRESH_TOKEN_EXPIRY_DAYS = 7; // Refresh token valid for 7 days

// --- Token Helpers ---
const generateAccessToken = (user: any) => {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

// --- Google Auth ---
// ⚠️ CRITICAL: DO NOT CHANGE THIS ROUTE OR URLS WITHOUT UPDATING GOOGLE CLOUD CONSOLE ⚠️
// The callback URL must match exactly what is in the Console.
router.get('/google', (req, res) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const callbackUrl = process.env.GOOGLE_CALLBACK_URL;
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    if (!clientId || !callbackUrl) {
        console.error('Missing Google OAuth Credentials:', { 
            hasClientId: !!clientId, 
            hasCallbackUrl: !!callbackUrl 
        });
        return res.redirect(`${clientUrl}/client-login?error=Server_Config_Error`);
    }

    console.log('Initiating Google Auth with Redirect URI:', callbackUrl);
    
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.append('client_id', clientId);
    googleAuthUrl.searchParams.append('redirect_uri', callbackUrl);
    googleAuthUrl.searchParams.append('response_type', 'code');
    googleAuthUrl.searchParams.append('scope', 'email profile');
    googleAuthUrl.searchParams.append('access_type', 'offline');
    googleAuthUrl.searchParams.append('prompt', 'consent');

    res.redirect(googleAuthUrl.toString());
});

router.get('/google/callback', async (req, res) => {
    const { code } = req.query;
    console.log('Received Google Callback. Code:', code ? 'Present' : 'Missing');

    try {
        if (!code) throw new Error('No authorization code received');

        // Exchange code for token
        console.log('Exchanging code for token...');
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GOOGLE_CALLBACK_URL,
            grant_type: 'authorization_code',
        });
        console.log('Token exchange successful.');

        const { access_token } = tokenResponse.data;

        // Get user info
        console.log('Fetching user profile...');
        const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User profile fetched:', profile.email);

        let user = await User.findOne({ email: profile.email });

        if (!user) {
            console.log('Creating new user...');
            user = new User({
                email: profile.email,
                role: 'client', // Default to client
                googleId: profile.id,
                onboardingData: {}, // Initialize empty onboarding data
            });
            await user.save();
            console.log('New user saved.');
        } else if (!user.googleId) {
            console.log('Linking existing user...');
            user.googleId = profile.id;
            await user.save();
            console.log('User linked.');
        } else {
            console.log('Existing user found.');
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken();
        
        // Store refresh token with expiry
        user.refreshToken = refreshToken;
        user.refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        await user.save();

        // Set HttpOnly cookies for secure token storage
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('auth_token', accessToken, {
            httpOnly: true,
            secure: isProduction, // Only send over HTTPS in production
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour (matches access token expiry)
            path: '/',
        });
        
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        });

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        // Still include URL params for backward compatibility with existing frontend
        const redirectUrl = `${clientUrl}/client-portal?token=${accessToken}&user=${encodeURIComponent(JSON.stringify({ id: user._id, email: user.email, role: user.role }))}`;
        console.log('Google Auth Successful. Redirecting user to portal.');

        // Redirect to frontend with token
        res.redirect(redirectUrl);
    } catch (err: any) {
        console.error('Google Auth Error Details:');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.error('Message:', err.message);
        }
        
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        res.redirect(`${clientUrl}/client-login?error=Google_Auth_Failed`);
    }
});


// Register (Optional, for admin or seeding)
router.post('/register', validateRegistrationMiddleware, async (req, res) => {
    const { email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ email, password, role });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { userId: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Login - with brute force protection
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        // Check if account is locked
        if (user.isLocked()) {
            const lockTimeRemaining = Math.ceil(((user.lockUntil?.getTime() || 0) - Date.now()) / 60000);
            return res.status(423).json({ 
                message: `Account temporarily locked. Try again in ${lockTimeRemaining} minutes.`,
                locked: true 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password || '');
        
        if (!isMatch) {
            // Increment failed attempts
            user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
            
            if (user.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
                // Lock the account
                user.lockUntil = new Date(Date.now() + LOCK_TIME_MS);
                await user.save();
                return res.status(423).json({ 
                    message: 'Too many failed attempts. Account locked for 15 minutes.',
                    locked: true 
                });
            }
            
            await user.save();
            const remainingAttempts = MAX_LOGIN_ATTEMPTS - user.failedLoginAttempts;
            return res.status(400).json({ 
                message: `Invalid Credentials. ${remainingAttempts} attempts remaining.` 
            });
        }

        // Successful login - reset failed attempts and lock
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken();
        
        // Store refresh token with expiry
        user.refreshToken = refreshToken;
        user.refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        await user.save();

        // Set HttpOnly cookies for secure token storage
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('auth_token', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour
            path: '/',
        });
        
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        });

        res.json({ token: accessToken, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create New Admin (Protected, Admin Only)
router.post('/create-admin', authMiddleware, validateRegistrationMiddleware, async (req: any, res) => {
    try {
        // 1. Check if requester is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const { email, password } = req.body;

        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // 3. Create new admin user
        user = new User({
            email,
            role: 'admin', // Explicitly set role
            onboardingData: {}
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({ message: 'Admin user created successfully', user: { id: user._id, email: user.email, role: user.role } });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Current User
router.get('/me', authMiddleware, async (req: any, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Validate session via cookie (for cookie-based auth)
router.get('/session', async (req: any, res) => {
    try {
        const token = req.cookies?.auth_token;
        
        if (!token) {
            return res.status(401).json({ valid: false, message: 'No session found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ valid: false, message: 'User not found' });
        }

        res.json({ 
            valid: true, 
            user: { id: user._id, email: user.email, role: user.role },
            token // Return token for frontend compatibility
        });
    } catch (err) {
        res.status(401).json({ valid: false, message: 'Invalid session' });
    }
});

// Logout - Clear cookies and invalidate refresh token
router.post('/logout', async (req: any, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Invalidate refresh token in database and blacklist access token
    try {
        const token = req.cookies?.auth_token || req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            // Decode token to get expiry for blacklist TTL
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
            
            // Blacklist the access token until it would have expired
            const tokenExpiry = new Date(decoded.exp * 1000);
            await TokenBlacklist.create({ token, expiresAt: tokenExpiry });
            
            // Invalidate refresh token in database
            await User.findByIdAndUpdate(decoded.userId, { 
                refreshToken: null, 
                refreshTokenExpiry: null 
            });
        }
    } catch (err) {
        // Token might be expired or invalid, but we still clear cookies
    }
    
    res.cookie('auth_token', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        expires: new Date(0), // Expire immediately
        path: '/',
    });
    
    res.cookie('refresh_token', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        expires: new Date(0),
        path: '/',
    });

    res.json({ message: 'Logged out successfully' });
});

// Refresh Token - Exchange refresh token for new access token
router.post('/refresh', async (req: any, res) => {
    try {
        const refreshToken = req.cookies?.refresh_token || req.body.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        // Find user with this refresh token
        const user = await User.findOne({ refreshToken });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Check if refresh token is expired
        if (user.refreshTokenExpiry && user.refreshTokenExpiry < new Date()) {
            // Clear expired refresh token
            user.refreshToken = undefined;
            user.refreshTokenExpiry = undefined;
            await user.save();
            return res.status(401).json({ message: 'Refresh token expired' });
        }

        // Generate new access token
        const accessToken = generateAccessToken(user);
        
        // Optionally rotate refresh token for extra security
        const newRefreshToken = generateRefreshToken();
        user.refreshToken = newRefreshToken;
        user.refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        await user.save();

        // Set new cookies
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('auth_token', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour
            path: '/',
        });
        
        res.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
            path: '/',
        });

        res.json({ 
            token: accessToken,
            user: { id: user._id, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('Refresh token error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

