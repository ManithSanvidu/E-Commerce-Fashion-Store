import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import multer from "multer";
import path from "path";

import fs from "fs";

// Ensure uploads directory exists locally
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const isServerless = process.env.VERCEL || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Vercel only allows writing to /tmp
    const dest = isServerless ? "/tmp" : "uploads/";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;