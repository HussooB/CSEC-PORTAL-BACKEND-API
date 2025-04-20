// src/models/event.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  location?: string;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: String,
  date: Date,
  time: String,
  location: String,
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);
