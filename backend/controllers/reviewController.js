import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  const { destination, rating, comment } = req.body;

  const review = await Review.create({
    user: req.user._id,
    destination,
    rating,
    comment
  });

  res.json(review);
};