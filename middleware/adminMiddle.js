const { body } = require('express-validator');

const adminMiddle = [
  body('title')
    .isString()
    .withMessage('Title Only contains alphabet and Numerical')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 character long.')
    .trim(),
  // body('imageUrl').isURL().withMessage('Enter a correct URL'),
  body('price').isNumeric().withMessage('Enter a valid price'),
  body('description')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Description must be between 5 to 1000 characters')
    .trim(),
];

module.exports = adminMiddle;
