const { body } = require('express-validator');

const loginAuthMiddle = [
  body('email')
    .isEmail()
    .withMessage('Please Enter a valid Email')
    .normalizeEmail(),
  body('password', 'Password must be at least 6 characters long')
    .isLength({
      min: 6,
    })
    .trim(),
];

module.exports = loginAuthMiddle;
