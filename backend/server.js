import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import couponRoutes from "./routes/CouponRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app=express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
const isServerless = process.env.VERCEL || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME;
const bundledUploadDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(bundledUploadDir));

if (isServerless) {
    app.use("/uploads", express.static("/tmp"));
}

app.use("/api", async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(503).json({
            message: "Database connection failed. Check the backend MONGO_URI environment variable and MongoDB Atlas network access.",
            error: process.env.NODE_ENV === "production" ? undefined : error.message,
        });
    }
});

app.use("/api/products",productRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/coupons", couponRoutes);

app.get("/", (req, res) => {
    res.send("API is running...")
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "production" ? {} : err.message
    });
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env.PORT || 5000;

if (!isServerless) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

export default app;
