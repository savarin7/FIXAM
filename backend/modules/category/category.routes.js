const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('./category.controller');

router.get('/', getAllCategories);
router.post('/', authMiddleware, roleMiddleware(['admin']), createCategory);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateCategory);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCategory);

module.exports = router;
