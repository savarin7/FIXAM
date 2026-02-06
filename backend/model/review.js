const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
