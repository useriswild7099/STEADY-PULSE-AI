import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import TokenBlacklist from '../models/TokenBlacklist';

interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.auth_token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Check if token is blacklisted
        const blacklisted = await TokenBlacklist.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: 'Token has been revoked' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    authMiddleware(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
        next();
    });
};

