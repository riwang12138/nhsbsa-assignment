const { check, validationResult } = require('express-validator');

const validateChecks = [
  check('input').trim().escape(),
  check('input').notEmpty().withMessage('Input cannot be empty'),
  check('input').isLength({ max: 10 }).withMessage('Must be less than 10 chars long'),
];

module.exports = { validateChecks, validationResult };
