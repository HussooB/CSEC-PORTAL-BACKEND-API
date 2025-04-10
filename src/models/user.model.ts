import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        current_profile_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            default: null,
        },
        personal_info: {
            first_name: { type: String },
            last_name: { type: String },
            gender: { type: String },
            birth_date: { type: Date },
            phone_number: { type: String },
            github_handle: { type: String },
            telegram_handle: { type: String },
            department: { type: String },
            specialization: { type: String },
            graduation_year: { type: Number },
            university_id: { type: String },
        },
        profile_list: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
        ],
    },
    { timestamps: true }
);
export default mongoose.model("User", User);
