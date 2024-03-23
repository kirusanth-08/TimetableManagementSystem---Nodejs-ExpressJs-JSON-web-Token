const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/loginController');
const authenticate = require('../middleware/authMiddleware');

router.post('/login', login);

router.post('/logout', authenticate, logout);

module.exports = router;