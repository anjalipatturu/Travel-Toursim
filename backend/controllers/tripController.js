import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  const { destinations, startDate, endDate } = req.body;

  const trip = await Trip.create({
    user: req.user._id,
    destinations,
    startDate,
    endDate
  });

  res.json(trip);
};

export const getMyTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).populate("destinations");
  res.json(trips);
};