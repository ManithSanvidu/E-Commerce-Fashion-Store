import express from "express";
import { createOrder, getOrders, getAllOrders } from "../controllers/OrderController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.post("/", createOrder);
router.get("/all", ClerkExpressRequireAuth(), isAdmin, getAllOrders);
router.get("/:userId", getOrders);

export default router;