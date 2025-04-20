// src/models/resource.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  name: string;
  link: string;
  uploaded_by?: mongoose.Types.ObjectId;
}

const ResourceSchema = new Schema<IResource>(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    uploaded_by: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model<IResource>('Resource', ResourceSchema);
