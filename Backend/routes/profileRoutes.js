const express = require('express');
const { createProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.put('/', authMiddleware, updateProfile);

module.exports = router;