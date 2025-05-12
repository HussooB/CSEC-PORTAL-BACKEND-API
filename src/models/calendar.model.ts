import mongoose, { Schema, Document } from 'mongoose';

export interface ICalendar extends Document {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'planned' | 'started' | 'ended';
  createdBy: mongoose.Types.ObjectId;
  showInCalendar: boolean; // Add this line
}

const CalendarSchema = new Schema<ICalendar>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['planned', 'started', 'ended'],
      default: 'planned',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    showInCalendar: { type: Boolean, default: true }, // Add this field
  },
  { timestamps: true }
);

export default mongoose.model<ICalendar>('Calendar', CalendarSchema);
