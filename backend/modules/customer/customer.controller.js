const Customer = require('../../model/customer');

exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find().populate('user', '-password');
  res.json(customers);
};

exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id).populate('user', '-password');
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json(customer);
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Customer deleted' });
};
