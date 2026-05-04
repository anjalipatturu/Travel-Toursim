import Booking from "../models/Booking.js";
import Destination from "../models/Destination.js";
import { createCheckoutSession } from "./paymentController.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { destination, date, persons } = req.body;

    const dest = await Destination.findById(destination);
    if (!dest) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const totalPrice = dest.price * persons;

    const booking = await Booking.create({
      user: req.user._id,
      destination,
      date,
      persons,
      totalPrice
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user bookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("destination");

  res.json(bookings);
};

// Create payment gateway checkout session
export const payBooking = createCheckoutSession;
