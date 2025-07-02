const { body } = require('express-validator');

exports.registerRules = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password too short')
];
exports.loginRules = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ]
  exports.updateRules = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ]