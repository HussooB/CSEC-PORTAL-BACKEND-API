import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date; // Event date
  time: string; // Event time
  division: mongoose.Types.ObjectId; // Division associated with the event
  visibility: 'public' | 'member'; // Visibility of the event
  status: 'planned' | 'started' | 'ended'; // Status of the event
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    visibility: {
      type: String,
      enum: ['public', 'member'],
      default: 'public',
    },
    status: {
      type: String,
      enum: ['planned', 'started', 'ended'],
      default: 'planned',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);