import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  name: string;
  link: string;
  uploaded_by?: mongoose.Types.ObjectId;
  division: mongoose.Types.ObjectId; // Add division field
}

const ResourceSchema = new Schema<IResource>(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    uploaded_by: { type: Schema.Types.ObjectId, ref: 'User' },
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true }, // Reference to Division
  },
  { timestamps: true }
);

export default mongoose.model<IResource>('Resource', ResourceSchema);