const Artisan = require('../../model/artesan');

exports.getAllArtisans = async (req, res) => {
  const artisans = await Artisan.find().populate('user', '-password');
  res.json(artisans);
};

exports.getArtisanById = async (req, res) => {
  const artisan = await Artisan.findById(req.params.id).populate('user', '-password');
  if (!artisan) return res.status(404).json({ message: 'Artisan not found' });
  res.json(artisan);
};

exports.createArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.create(req.body);
    res.status(201).json(artisan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateArtisan = async (req, res) => {
  const updated = await Artisan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteArtisan = async (req, res) => {
  await Artisan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Artisan deleted' });
};
