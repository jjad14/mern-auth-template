const { body, validationResult } = require('express-validator');

// Validation for Authentication (Login)
// Validates email, password
exports.validateLogin = [
  body('email', 'A valid email is required').isEmail(),
  body('password', 'A valid password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];