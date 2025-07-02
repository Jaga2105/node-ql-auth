const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const { registerRules } = require('../validator/userValidator');

// Public routes
router.post(
  '/register',
  validate(registerRules),
  register
);

module.exports = router;
