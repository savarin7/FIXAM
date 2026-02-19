const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllUsers, updateUserById, deleteUser } = require('./user.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');
 

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllUsers);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUserById);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

module.exports = router;
