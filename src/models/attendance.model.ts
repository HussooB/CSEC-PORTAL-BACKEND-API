import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  profile: mongoose.Types.ObjectId;
  session: mongoose.Types.ObjectId; // Add session field
  sessionDate: Date;
  status: 'present' | 'absent' | 'excused';
}

const AttendanceSchema = new Schema<IAttendance>({
  profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true }, // Add session field
  sessionDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['present', 'absent', 'excused'],
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
