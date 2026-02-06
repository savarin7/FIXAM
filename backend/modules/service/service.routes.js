const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');
const { getAllServices, getServiceById, createService, updateService, deleteService } = require('./service.controller');

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', authMiddleware, roleMiddleware(['artisan', 'admin']), createService);
router.put('/:id', authMiddleware, roleMiddleware(['artisan', 'admin']), updateService);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteService);

module.exports = router;
