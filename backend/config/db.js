import mongoose from "mongoose";

let connectionPromise = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    if (connectionPromise) return connectionPromise;

    connectionPromise = (async () => {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("MongoDB Connected");
    })();

    try {
        await connectionPromise;
    } catch (error) {
        connectionPromise = null;
        console.error("DB Connection failed:", error.message);
        throw error;
    }
};

export default connectDB;
