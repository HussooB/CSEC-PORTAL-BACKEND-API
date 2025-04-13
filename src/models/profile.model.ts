import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  division: mongoose.Types.ObjectId;
  group?: string;
  mentor?: mongoose.Types.ObjectId;
  joining_date: Date;
  last_seen?: string;
  attendance: mongoose.Types.ObjectId[];
  progress: mongoose.Types.ObjectId[];
  heads_ups: mongoose.Types.ObjectId[];
  status: 'active' | 'past';
}

const ProfileSchema = new Schema<IProfile>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
  group: String,
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  joining_date: { type: Date },
  last_seen: { type: String },
  attendance: [{ type: Schema.Types.ObjectId, ref: 'Attendance' }],
  progress: [{ type: Schema.Types.ObjectId, ref: 'Progress' }],
  heads_ups: [{ type: Schema.Types.ObjectId, ref: 'HeadsUp' }],
  status: {
    type: String,
    enum: ['active', 'past'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.model<IProfile>('Profile', ProfileSchema);
