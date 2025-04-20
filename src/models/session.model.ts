// src/models/session.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  title: string;
  division: mongoose.Types.ObjectId;
  groups: mongoose.Types.ObjectId[];
  startMonth: Date;
  endMonth: Date;
  day: string;
  startTime: string;
  endTime: string;
  status: 'planned' | 'ended';
}

const SessionSchema = new Schema<ISession>({
  title: { type: String, required: true },
  division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  startMonth: Date,
  endMonth: Date,
  day: String,
  startTime: String,
  endTime: String,
  status: {
    type: String,
    enum: ['planned', 'ended'],
    default: 'planned'
  }
}, { timestamps: true });

export default mongoose.model<ISession>('Session', SessionSchema);
