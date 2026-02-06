const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');
const { getAllRequests, getRequestById, createRequest, updateRequest, deleteRequest } = require('./request.controller');

router.get('/', authMiddleware, roleMiddleware(['admin', 'artisan']), getAllRequests);
router.get('/:id', authMiddleware, getRequestById);
router.post('/', authMiddleware, roleMiddleware(['customer']), createRequest);
router.put('/:id', authMiddleware, updateRequest);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteRequest);

module.exports = router;
