const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  scheduledDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
