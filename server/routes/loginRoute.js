const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/loginController');

router.post('/login', async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    logout(req, res);
});

module.exports = router;