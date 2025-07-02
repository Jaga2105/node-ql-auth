const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const { registerRules, loginRules, updateRules } = require('../validator/userValidator');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticator');

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

router.put(
  '/:id',
  authenticate,
  validate(updateRules),
  updateUser
);
router.delete(
    '/:id',
    authenticate,
    deleteUser
)


module.exports = router;
