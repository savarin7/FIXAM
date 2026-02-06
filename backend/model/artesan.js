const mongoose = require('mongoose');

const ArtisanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [String],
  bio: String,
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Artisan', ArtisanSchema);
