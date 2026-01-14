import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.warn('WARNING: Missing recommended environment variables:', missingEnvVars.join(', '));
}

const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/auth';
import clientRoutes from './routes/client';
import adminRoutes from './routes/admin';

// Middleware
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
    origin: clientUrl,
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
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
