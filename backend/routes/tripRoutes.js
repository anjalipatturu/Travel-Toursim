import express from "express";
import { createTrip, getMyTrips } from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getMyTrips);

export default router;