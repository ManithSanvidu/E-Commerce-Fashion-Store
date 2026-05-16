import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("DB Connection failed:", error.message);
        // Do not call process.exit(1) in serverless environments
        // Throwing error will let the function handler decide how to react
        throw error;
    }
};

export default connectDB;