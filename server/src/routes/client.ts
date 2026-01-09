import express from 'express';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Submit Onboarding Data
router.post('/onboarding', authMiddleware, async (req: any, res) => {
    try {
        const { generalData, brandData } = req.body;

        // Merge existing onboarding data with new data
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.onboardingData = { ...user.onboardingData, ...generalData, ...brandData };
        
        // Set status to pending and timestamp if this is the first submission
        if (!user.onboardingSubmittedAt) {
            user.onboardingStatus = 'pending';
            user.onboardingSubmittedAt = new Date();
        }
        
        await user.save();

        res.json(user.onboardingData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Onboarding Data
router.get('/onboarding', authMiddleware, async (req: any, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user.onboardingData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;
