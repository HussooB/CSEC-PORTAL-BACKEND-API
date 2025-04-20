// src/models/headsUp.model.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IHeadsUp extends Document {
  profile: mongoose.Types.ObjectId; // Who gave the heads up
  session: mongoose.Types.ObjectId; // Which session it's about
  reason: string; // Their excuse message
  status: 'pending' | 'acknowledged' | 'rejected'; // Optional: tracking if it was approved
}

const HeadsUpSchema = new Schema<IHeadsUp>({
  profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'acknowledged', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model<IHeadsUp>('HeadsUp', HeadsUpSchema);
