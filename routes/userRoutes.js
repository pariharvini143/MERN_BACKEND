// server/routes/userRoutes.js
const express = require('express');
const { getMe, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, getMe);
router.put('/me', auth, updateProfile);

module.exports = router;