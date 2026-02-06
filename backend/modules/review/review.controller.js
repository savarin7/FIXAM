const Review = require('../../model/review');

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate('customer').populate('artisan');
  res.json(reviews);
};

exports.getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.id).populate('customer').populate('artisan');
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
};

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
