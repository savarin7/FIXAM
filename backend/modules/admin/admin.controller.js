const Admin = require('../../model/admin');

exports.getAllAdmins = async (req, res) => {
  const admins = await Admin.find().populate('user', '-password');
  res.json(admins);
};

exports.createAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);
  res.status(201).json(admin);
};

exports.updateAdmin = async (req, res) => {
  const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteAdmin = async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ message: 'Admin deleted' });
};
