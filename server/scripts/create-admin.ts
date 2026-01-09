
import mongoose from 'mongoose';
import User from '../src/models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is undefined in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@steadypulseai.com';
        const password = 'adminpassword123'; // Default password

        let user = await User.findOne({ email });

        if (user) {
            console.log('Admin user already exists. Updating role to admin...');
            user.role = 'admin';
        } else {
            console.log('Creating new admin user...');
            user = new User({ email, role: 'admin' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log(`Admin user set: ${email} / ${password}`);

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
};

createAdmin();
