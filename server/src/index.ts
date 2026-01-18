import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.warn('WARNING: Missing recommended environment variables:', missingEnvVars.join(', '));
}

// JWT_SECRET is CRITICAL - fail hard if missing
if (!process.env.JWT_SECRET) {
    throw new Error('FATAL: JWT_SECRET environment variable is required for security. Server cannot start without it.');
}

const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/auth';
import clientRoutes from './routes/client';
import adminRoutes from './routes/admin';
import { generalLimiter, authLimiter } from './middleware/rateLimit';

// Security Middleware - Helmet should be first
app.use(helmet({
    // Configure Helmet for cross-origin compatibility
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'https:'],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'", 'https://accounts.google.com', 'https://oauth2.googleapis.com', 'https://www.googleapis.com'],
        },
    },
}));

// CORS Middleware
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
    origin: clientUrl,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Apply general rate limiting to all API routes
app.use('/api', generalLimiter);

// Routes - Auth routes get stricter rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/steadypulseai';

// Serverless-friendly DB connection with caching
let isConnected = false; 

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);
        isConnected = !!db.connections[0].readyState;
        console.log('New MongoDB connection established');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Don't exit process in serverless, just log
    }
};

// Connect immediately (useful for local dev and serverless initialization)
connectDB();

// Basic Route
app.get('/', (req, res) => {
    res.send('STEADY PULSE AI API is running');
});

// Conditionally listen (for local development)
if (process.env.NODE_ENV !== 'production' && require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export app for Vercel
export default app;
