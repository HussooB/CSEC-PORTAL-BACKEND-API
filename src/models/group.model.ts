// src/models/group.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  division: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const GroupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<IGroup>('Group', GroupSchema);
