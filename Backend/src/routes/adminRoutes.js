import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
// import { protectAdmin } from "../middleware/authMiddleware.js"; // optional: for admin-only access

const router = express.Router();

// GET /api/admin/dashboard
router.get("/dashboard", protectAdmin, getDashboardStats);

export default router;
