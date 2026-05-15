import express from "express";
import { getCoupons, createCoupon } from "../controllers/CouponController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.get("/", getCoupons);
router.post("/", createCoupon);

export default router;
