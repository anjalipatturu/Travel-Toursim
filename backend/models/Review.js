import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
  rating: Number,
  comment: String
});

export default mongoose.model("Review", reviewSchema);