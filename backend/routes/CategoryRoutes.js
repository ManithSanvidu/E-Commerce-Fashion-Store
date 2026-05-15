import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
