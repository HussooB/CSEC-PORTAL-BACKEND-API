import mongoose from "mongoose";

const Profile = new mongoose.Schema(
    {
        division: { type: String, required: true },
        group: { type: String },
        mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
        joining_date: { type: Date },
        last_seen: { type: String },
        attendance: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
        ],
        progress: [{ type: mongoose.Schema.Types.ObjectId, ref: "Progress" }],
        heads_ups: [{ type: mongoose.Schema.Types.ObjectId, ref: "HeadsUp" }],
    },
    { timestamps: true }
);

export default mongoose.model("Profile", Profile);
