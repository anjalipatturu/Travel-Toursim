import express from "express";
import { planTrip } from "../controllers/aiController.js";

const router = express.Router();

router.post("/plan", planTrip);

export default router;