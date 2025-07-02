const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const { registerRules, loginRules } = require('../validator/userValidator');
const { getAllUsers } = require('../controllers/userController');

// Public routes
router.post(
  '/register',
  validate(registerRules),
  register
);
router.post(
  '/login',
  validate(loginRules),
  login
);

router.get('/', getAllUsers);


module.exports = router;
