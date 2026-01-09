import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// --- Social Auth Helpers ---
const generateToken = (user: any) => {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
};

// --- Google Auth ---
router.get('/google', (req, res) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CALLBACK_URL) {
        console.error('Missing Google OAuth Credentials');
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        return res.redirect(`${clientUrl}/client-login?error=Server_Config_Error`);
    }
    console.log('Initiating Google Auth with Client ID:', process.env.GOOGLE_CLIENT_ID);
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=email%20profile`;
    res.redirect(redirectUrl);
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

        const token = generateToken(user);

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        const redirectUrl = `${clientUrl}/client-portal?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user._id, email: user.email, role: user.role }))}`;
        console.log('Redirecting to:', redirectUrl);

        // Redirect to frontend with token
        // In production, use a more secure way, e.g., set cookie or redirect to a loading page that extracts param
        res.redirect(redirectUrl);
    } catch (err: any) {
        console.error('Google Auth Error:', err.message);
        if (err.response) {
            console.error('Response data:', err.response.data);
        }
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        res.redirect(`${clientUrl}/client-login?error=Google_Auth_Failed`);
    }
});


// --- LinkedIn Auth ---
router.get('/linkedin', (req, res) => {
    if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CALLBACK_URL) {
        console.error('Missing LinkedIn OAuth Credentials');
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        return res.redirect(`${clientUrl}/client-login?error=Server_Config_Error`);
    }
    const redirectUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&scope=openid%20profile%20email`;
    res.redirect(redirectUrl);
});

router.get('/linkedin/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { data } = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const { access_token } = data;

        // Get user info (OpenID Connect)
        const { data: profile } = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        let email = profile.email;
        if (!email && profile.elements) {
            // Fallback for different LinkedIn API versions which nest email in elements
            const emailHandle = profile.elements.find((e: any) => e['handle~'] && e['handle~'].emailAddress);
            if (emailHandle) {
                email = emailHandle['handle~'].emailAddress;
            }
        }

        if (!email) {
            throw new Error('Could not retrieve email from LinkedIn');
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                role: 'client',
                linkedinId: profile.sub || profile.id,
                onboardingData: {},
            });
            await user.save();
        } else if (!user.linkedinId) {
            user.linkedinId = profile.sub;
            await user.save();
        }

        const token = generateToken(user);
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        res.redirect(`${clientUrl}/client-portal?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user._id, email: user.email, role: user.role }))}`);

    } catch (err) {
        console.error('LinkedIn Auth Error:', err);
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        res.redirect(`${clientUrl}/client-login?error=LinkedIn_Auth_Failed`);
    }
});

// Register (Optional, for admin or seeding)
router.post('/register', async (req, res) => {
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
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = { userId: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });

        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create New Admin (Protected, Admin Only)
router.post('/create-admin', authMiddleware, async (req: any, res) => {
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

export default router;
