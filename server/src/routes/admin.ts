import express from 'express';
import User from '../models/User';
import { isAdmin } from '../middleware/auth';
import { sensitiveLimiter } from '../middleware/rateLimit';

const router = express.Router();

// Get all admin users/workers (for assignment dropdown)
router.get('/workers', isAdmin, async (req: any, res) => {
    try {
        const workers = await User.find({ role: 'admin' }).select('_id email');
        res.json(workers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all users (Admin only)
router.get('/users', isAdmin, async (req: any, res) => {
    try {
        // Fetch clients, sort by newest first, exclude password
        const users = await User.find({ role: 'client' }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all client onboarding submissions (Admin only)
router.get('/clients', isAdmin, async (req: any, res) => {
    try {
        // Only fetch clients who have submitted onboarding data
        const clients = await User.find({ 
            role: 'client',
            onboardingSubmittedAt: { $exists: true }
        })
        .select('-password')
        .populate('assignedWorker', 'email')
        .sort({ onboardingSubmittedAt: -1 });

        res.json({ clients });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get specific client details (Admin only)
router.get('/clients/:id', isAdmin, async (req: any, res) => {
    try {
        const client = await User.findOne({ 
            _id: req.params.id,
            role: 'client'
        })
        .select('-password')
        .populate('assignedWorker', 'email');

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update client onboarding status (Admin only, rate limited)
router.put('/clients/:id/status', sensitiveLimiter, isAdmin, async (req: any, res) => {
    try {
        const { status, assignedTo } = req.body;

        // Validate status
        if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updateData: any = {};
        if (status) updateData.onboardingStatus = status;
        if (assignedTo !== undefined) updateData.assignedWorker = assignedTo || null;

        const client = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'client' },
            { $set: updateData },
            { new: true }
        )
        .select('-password')
        .populate('assignedWorker', 'email');

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;
