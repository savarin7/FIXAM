const Notification = require('../../model/notification');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id });
  res.json(notifications);
};

exports.createNotification = async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json(notification);
};

exports.markAsRead = async (req, res) => {
  const updated = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(updated);
};
