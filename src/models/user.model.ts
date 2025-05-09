import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'super_admin' | 'president' | 'vice_president' | 'division_head' | 'member';
  current_profile_id?: mongoose.Types.ObjectId;
  profile_list: mongoose.Types.ObjectId[];
  displayPhoneNumber: boolean; // New field
  personal_info?: {
    first_name?: string;
    last_name?: string;
    gender?: string;
    birth_date?: Date;
    phone_number?: string;
    github_handle?: string;
    telegram_handle?: string;
    department?: string;
    specialization?: string;
    graduation_year?: number;
    university_id?: string;
    bio?: string;
    instagram_handle?: string;
    linkedin_handle?: string;
    leetcode_handle?: string;
    codeforce_handle?: string;
    profile_picture?: string;
    cv_link?: string;
  };
  refreshToken?: string | null;
  lastSeen?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['super_admin', 'president', 'vice_president', 'division_head', 'member'],
      default: 'member',
    },
    current_profile_id: { type: Schema.Types.ObjectId, ref: 'Profile', default: null },
    profile_list: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    displayPhoneNumber: { 
      type: Boolean, 
      default: true // Default to showing phone number
    },
    personal_info: {
      first_name: String,
      last_name: String,
      gender: String,
      birth_date: Date,
      phone_number: String,
      github_handle: String,
      telegram_handle: String,
      department: String,
      specialization: String,
      graduation_year: Number,
      university_id: String,
      bio: String,
      instagram_handle: String,
      linkedin_handle: String,
      leetcode_handle: String,
      codeforce_handle: String,
      profile_picture: String,
      cv_link: String,
    },
    refreshToken: { type: String, default: null },
    lastSeen: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);