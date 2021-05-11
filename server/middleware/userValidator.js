const { body, validationResult } = require('express-validator');

// Validation for Registration
// Validates name, email, password, passwordConfirmation
exports.validateUser = [
  body('name', 'A Name is required').not().isEmpty(),
  body('email', 'A valid email is required').isEmail(),
  body(
    'password',
    'A valid password with a minimum of 6 characters is required'
  ).isLength({ min: 6 }),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];