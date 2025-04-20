// src/models/role.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  permissions: string[];
  is_active: boolean;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    permissions: [String],
    is_active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IRole>('Role', RoleSchema);
