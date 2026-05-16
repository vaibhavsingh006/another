const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { signup, loginUser, getMe, logout } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', loginUser);
router.post('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;
