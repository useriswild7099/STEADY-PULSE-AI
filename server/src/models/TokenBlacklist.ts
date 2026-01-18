import mongoose, { Schema, Document } from 'mongoose';

export interface ITokenBlacklist extends Document {
    token: string;
    expiresAt: Date;
    createdAt: Date;
}

const TokenBlacklistSchema: Schema = new Schema({
    token: { 
        type: String, 
        required: true, 
        unique: true,
        index: true 
    },
    expiresAt: { 
        type: Date, 
        required: true,
        // TTL index - MongoDB will automatically delete expired documents
        index: { expires: 0 }
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

// Create a TTL index on expiresAt field
// This will automatically remove documents when their expiresAt time passes
TokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ITokenBlacklist>('TokenBlacklist', TokenBlacklistSchema);
