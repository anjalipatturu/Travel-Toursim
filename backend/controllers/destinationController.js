import Destination from "../models/Destination.js";

export const getDestinations = async (req, res) => {
  const data = await Destination.find();
  res.json(data);
};

export const createDestination = async (req, res) => {
  const dest = await Destination.create(req.body);
  res.json(dest);
};