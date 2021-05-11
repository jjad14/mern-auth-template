const express = require('express');
const { validateUser } = require('../middleware/userValidator');
const { validateLogin } = require('../middleware/loginValidation');
const { loginUser, registerUser, logout, loggedIn } = require('../controllers/userController');

const router = express.Router();

router.route('/').post(validateUser, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/logout', logout);
router.get('/loggedIn', loggedIn);

module.exports = router;
