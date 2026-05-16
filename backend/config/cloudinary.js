import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Cloudinary environment variables are missing!");
} else {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary configured successfully");
  } catch (err) {
    console.error("Error configuring Cloudinary:", err);
  }
}

let storage;
try {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "products",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });
} catch (err) {
  console.error("Failed to initialize Cloudinary storage:", err);
  storage = null; // Multer will fail later but the app won't crash on start
}

export { cloudinary, storage };
