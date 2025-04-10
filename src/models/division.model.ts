import mongoose from "mongoose";

const Division = new mongoose.Schema(
    {
        division_name: {
            type: String,
        },
        description: {
            type: String,
        },
        logo: {
            type: String,
        },
        year_of_establishment: {
            type: Number,
        },
        Groups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Group",
            },
        ],
        Head: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        Coordinators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        Members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);
export default mongoose.model("Division", Division);
