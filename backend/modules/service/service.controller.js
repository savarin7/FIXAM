const Service = require('../../model/service');

exports.getAllServices = async (req, res) => {
  const services = await Service.find().populate('artisan');
  res.json(services);
};

exports.getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id).populate('artisan');
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateService = async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted' });
};
