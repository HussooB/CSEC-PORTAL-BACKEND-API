import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  profile: mongoose.Types.ObjectId;
  sessionDate: Date;
  status: 'present' | 'absent' | 'excused';
}

const AttendanceSchema = new Schema<IAttendance>({
  profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  sessionDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['present', 'absent', 'excused'],
    required: true,
  }
}, { timestamps: true });

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
