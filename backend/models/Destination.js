import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  price: Number,
  rating: { type: Number, default: 0 },
  images: [String]
});

export default mongoose.model("Destination", destinationSchema);