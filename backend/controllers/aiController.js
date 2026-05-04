import { generateTripPlan } from "../services/aiService.js";

export const planTrip = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ message: "Trip query is required" });
    }

    const result = await generateTripPlan(query);

    res.json({ plan: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
