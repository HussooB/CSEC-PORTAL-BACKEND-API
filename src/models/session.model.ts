import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  title: string;
  division: mongoose.Types.ObjectId;
  groups: mongoose.Types.ObjectId[];
  date: Date; // Represents the specific session date
  startTime: string; // Start time of the session (e.g., "10:00")
  endTime: string; // End time of the session (e.g., "12:00")
  status: 'planned' | 'started' | 'ended';
}

const SessionSchema = new Schema<ISession>(
  {
    title: { type: String, required: true },
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    date: { type: Date, required: true }, // Specific session date
    startTime: { type: String, required: true }, // Start time
    endTime: { type: String, required: true }, // End time
    status: {
      type: String,
      enum: ['planned', 'started', 'ended'], // Added "started" status
      default: 'planned',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISession>('Session', SessionSchema);