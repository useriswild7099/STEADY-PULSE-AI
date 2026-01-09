
import mongoose from 'mongoose';
import User from '../src/models/User';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const verifyData = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is undefined in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({}).sort({ updatedAt: -1 });
        console.log(`Found ${users.length} users.`);

        users.forEach(user => {
            console.log('---------------------------------------------------');
            console.log(`User: ${user.email} (Role: ${user.role})`);
            console.log('Onboarding Data Keys:', Object.keys(user.onboardingData || {}));
            if (user.onboardingData && Object.keys(user.onboardingData).length > 0) {
                console.log('Sample Data (Company):', user.onboardingData.companyNameGeneral || 'N/A');
            } else {
                console.log('No onboarding data found.');
            }
        });
        console.log('---------------------------------------------------');

    } catch (error) {
        console.error('Verification Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
};

verifyData();
