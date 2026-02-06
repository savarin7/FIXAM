const Request = require('../../model/request');

exports.getAllRequests = async (req, res) => {
  const requests = await Request.find().populate('customer').populate('service');
  res.json(requests);
};

exports.getRequestById = async (req, res) => {
  const request = await Request.findById(req.params.id).populate('customer').populate('service');
  if (!request) return res.status(404).json({ message: 'Request not found' });
  res.json(request);
};

exports.createRequest = async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRequest = async (req, res) => {
  const updated = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteRequest = async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.json({ message: 'Request deleted' });
};
