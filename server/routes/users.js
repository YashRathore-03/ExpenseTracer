// server/routes/users.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
