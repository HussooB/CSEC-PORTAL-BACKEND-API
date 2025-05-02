import mongoose, { Schema, Document } from 'mongoose';

export interface IHead extends Document {
  division: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  role: 'division_head' | 'coordinator';
}

const HeadSchema = new Schema<IHead>(
  {
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: {
      type: String,
      enum: ['division_head', 'coordinator'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IHead>('Head', HeadSchema);