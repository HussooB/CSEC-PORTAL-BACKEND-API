import mongoose, { Schema, Document } from 'mongoose';

export interface IDivision extends Document {
  name: string;
  head?: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  coordinators: mongoose.Types.ObjectId[];
  year_of_establishment?: number;
  logo?: string;
}

const DivisionSchema = new Schema<IDivision>({
  name: { type: String, required: true },
  head: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  coordinators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  year_of_establishment: Number,
  logo: String,
}, { timestamps: true });

export default mongoose.model<IDivision>('Division', DivisionSchema);
