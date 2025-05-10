import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  name: string;
  link: string;
  uploaded_by: mongoose.Types.ObjectId;
  division?: mongoose.Types.ObjectId; // Made optional by removing "required: true"
}

const ResourceSchema = new Schema<IResource>(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    uploaded_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    division: { type: Schema.Types.ObjectId, ref: 'Division' } // Removed required
  },
  { timestamps: true }
);

export default mongoose.model<IResource>('Resource', ResourceSchema);