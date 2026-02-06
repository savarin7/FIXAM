const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');
const { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } = require('./admin.controller');

router.get('/', authMiddleware, roleMiddleware(['admin']), getAllAdmins);
router.post('/', authMiddleware, roleMiddleware(['admin']), createAdmin);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateAdmin);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteAdmin);

module.exports = router;
