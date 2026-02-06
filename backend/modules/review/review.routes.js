const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { getAllReviews, getReviewById, createReview } = require('./review.controller');

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', authMiddleware, createReview);

module.exports = router;
