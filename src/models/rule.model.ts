// src/models/rule.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRule extends Document {
  maxAbsences: number;
  warningAfter: number;
  suspendAfter: number;
  fireAfter: number;
  permanentRestriction: boolean;
}

const RuleSchema = new Schema<IRule>({
  maxAbsences: Number,
  warningAfter: Number,
  suspendAfter: Number,
  fireAfter: Number,
  permanentRestriction: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IRule>('Rule', RuleSchema);
