import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
  startDate: Date,
  endDate: Date
});

export default mongoose.model("Trip", tripSchema);