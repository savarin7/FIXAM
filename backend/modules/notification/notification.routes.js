const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { getNotifications, createNotification, markAsRead } = require('./notification.controller');

router.get('/', authMiddleware, getNotifications);
router.post('/', authMiddleware, createNotification);
router.put('/:id/read', authMiddleware, markAsRead);

module.exports = router;
