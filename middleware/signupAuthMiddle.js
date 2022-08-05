const { body } = require('express-validator');
const User = require('../models/user');

const signupAuthMiddle = [
  body('email')
    .isEmail()
    .withMessage('Please Enter a valid Email')
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('Email already exist');
        }
      });
    })
    .normalizeEmail(),
  body('password', 'Password must be at least 6 characters long')
    .isLength({
      min: 6,
    })
    .trim(),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password doesn't match");
      }
      return true;
    })
    .trim(),
];

module.exports = signupAuthMiddle;
