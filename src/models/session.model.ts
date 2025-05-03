import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  title: string;
  description: string;
  division: mongoose.Types.ObjectId;
  groups: mongoose.Types.ObjectId[]; // Change from groups to group
  date: Date;
  startTime: string;
  endTime: string;
  status: 'planned' | 'started' | 'ended';
}

const SessionSchema = new Schema<ISession>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }], // Change from groups to group
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['planned', 'started', 'ended'],
      default: 'planned',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISession>('Session', SessionSchema);