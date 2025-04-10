import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async (): Promise<void> => {
    try {
        const mongoDBUrl = process.env.MONGODB_URL;
        if (!mongoDBUrl) {
            throw new Error(
                "MONGODB_URL is not defined in the environment variables"
            );
        }
        await mongoose.connect(mongoDBUrl, {} as mongoose.ConnectOptions);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

export default connectToDB;
