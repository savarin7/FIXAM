const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');
const { getAllArtisans, getArtisanById, createArtisan, updateArtisan, deleteArtisan } = require('./artisan.controller');

router.get('/', getAllArtisans);
router.get('/:id', getArtisanById);
router.post('/', authMiddleware, roleMiddleware(['admin']), createArtisan);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateArtisan);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteArtisan);

module.exports = router;
