import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    role: 'client' | 'admin';
    googleId?: string;
    // Refresh token for persistent sessions
    refreshToken?: string;
    refreshTokenExpiry?: Date;
    // Brute force protection
    failedLoginAttempts?: number;
    lockUntil?: Date;
    // Onboarding
    onboardingData?: any;
    onboardingStatus?: 'pending' | 'in-progress' | 'completed';
    onboardingSubmittedAt?: Date;
    assignedWorker?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    // Helper method to check if account is locked
    isLocked(): boolean;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth users
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    googleId: { type: String },
    // Refresh token for persistent sessions
    refreshToken: { type: String },
    refreshTokenExpiry: { type: Date },
    // Brute force protection
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    // Onboarding
    onboardingData: { type: Schema.Types.Mixed }, // Flexible onboarding forms data
    onboardingStatus: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    onboardingSubmittedAt: { type: Date },
    assignedWorker: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// Check if account is currently locked
UserSchema.methods.isLocked = function(): boolean {
    return !!(this.lockUntil && this.lockUntil > new Date());
};

export default mongoose.model<IUser>('User', UserSchema);

