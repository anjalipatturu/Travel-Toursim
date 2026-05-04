import express from "express";
import {
  createBooking,
  getMyBookings,
  payBooking
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getMyBookings);
router.put("/:id/pay", protect, payBooking);

export default router;
