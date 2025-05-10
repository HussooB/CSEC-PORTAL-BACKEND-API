import mongoose, { Schema, Document } from 'mongoose';

export interface ICalendar extends Document {
  title: string;
  description: string;
  division: mongoose.Types.ObjectId;
  groups: mongoose.Types.ObjectId[];
  date: Date;
  startTime: string;
  endTime: string;
  status: 'planned' | 'started' | 'ended';
}

const CalendarSchema = new Schema<ICalendar>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['planned', 'started', 'ended'],
      default: 'planned',
    }
  },
  { timestamps: true }
);

export default mongoose.model<ICalendar>('Calendar', CalendarSchema);