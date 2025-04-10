import mongoose from "mongoose";

const Profile = new mongoose.Schema({
    division: { type: String, required: true },
    group: { type: String },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
    joining_date: { type: Date },
    last_seen: { type: String },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
    progress: [{ type: mongoose.Schema.Types.ObjectId, ref: "Progress" }],
    heads_ups: [{ type: mongoose.Schema.Types.ObjectId, ref: "HeadsUp" }],
    personal_info: {
        bio: { type: String },
        instagram_handle: { type: String },
        linkedin_handle: { type: String },
        leetcode_handle: { type: String },
        codeforce_handle: { type: String },
        cv_link: { type: String },
        resources: [{ resource_name: String, resource_link: String }],
    },
});

export default mongoose.model("Profile", Profile);
