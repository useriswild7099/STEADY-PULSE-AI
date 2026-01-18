import { Request, Response, NextFunction } from 'express';

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * Validates password strength
 * Requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 */
export const validatePassword = (password: string): ValidationResult => {
    const errors: string[] = [];

    if (!password) {
        return { isValid: false, errors: ['Password is required'] };
    }

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
    const errors: string[] = [];

    if (!email) {
        return { isValid: false, errors: ['Email is required'] };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Middleware to validate registration/password fields
 */
export const validatePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    const result = validatePassword(password);

    if (!result.isValid) {
        return res.status(400).json({
            message: 'Password validation failed',
            errors: result.errors
        });
    }

    next();
};

/**
 * Middleware to validate email field
 */
export const validateEmailMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const result = validateEmail(email);

    if (!result.isValid) {
        return res.status(400).json({
            message: 'Email validation failed',
            errors: result.errors
        });
    }

    next();
};

/**
 * Combined validation middleware for registration
 */
export const validateRegistrationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);

    const allErrors = [...emailResult.errors, ...passwordResult.errors];

    if (allErrors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: allErrors
        });
    }

    next();
};
