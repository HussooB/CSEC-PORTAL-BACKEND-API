import mongoose, { Schema, Document } from 'mongoose';

export interface IContribution extends Document {
  profile: mongoose.Types.ObjectId;
  type: 'document' | 'code' | 'idea';
  description: string;
  submitted_at: Date;
}

const ContributionSchema = new Schema<IContribution>({
  profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  type: {
    type: String,
    enum: ['document', 'code', 'idea'],
    required: true
  },
  description: String,
  submitted_at: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IContribution>('Contribution', ContributionSchema);
