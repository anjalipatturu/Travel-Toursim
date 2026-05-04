import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    persons: {
      type: Number,
      default: 1
    },
    totalPrice: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "canceled"],
      default: "pending"
    },
    payment: {
      provider: {
        type: String,
        default: "stripe"
      },
      checkoutSessionId: String,
      paymentIntentId: String,
      paidAt: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
