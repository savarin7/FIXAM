const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
