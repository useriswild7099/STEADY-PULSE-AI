import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    role: 'client' | 'admin';
    googleId?: string;
    linkedinId?: string;
    onboardingData?: any;
    onboardingStatus?: 'pending' | 'in-progress' | 'completed';
    onboardingSubmittedAt?: Date;
    assignedWorker?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth users
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    googleId: { type: String },
    linkedinId: { type: String },
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

export default mongoose.model<IUser>('User', UserSchema);
