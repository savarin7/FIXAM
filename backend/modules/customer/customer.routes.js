const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');
const { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('./customer.controller');

router.get('/', authMiddleware, roleMiddleware(['admin']), getAllCustomers);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), getCustomerById);
router.post('/', authMiddleware, roleMiddleware(['admin']), createCustomer);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateCustomer);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCustomer);

module.exports = router;
