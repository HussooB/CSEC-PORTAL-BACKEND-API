import mongoose, { Schema, Document } from 'mongoose';

export interface IHeadsUp extends Document {
  profile: mongoose.Types.ObjectId; // User ID
  session: mongoose.Types.ObjectId; // Session ID
  type: 'emergency' | 'medical' | 'other'; // Predefined types
  reason: string; // Reason for the heads-up
  status: 'pending' | 'approved' | 'rejected'; // Status of the heads-up
}

const HeadsUpSchema = new Schema<IHeadsUp>(
  {
    profile: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    type: {
      type: String,
      enum: ['emergency', 'medical case', 'family issue'], // Add 'family issue' here
      required: true,
    },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IHeadsUp>('HeadsUp', HeadsUpSchema);