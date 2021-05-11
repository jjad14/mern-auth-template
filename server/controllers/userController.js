const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const cookieOptions = require('../utils/cookieOptions');

// POST /api/users
// Register a new user
// Public Access
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check if the email is in use
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [ {msg: 'Invalid User Credentials'} ] });
        }

        // create new user instance
        user = new User({
            name,
            email,
            password
        });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user to db
        await user.save();

        // create and sign the token
        const token = generateToken(user._id);
  
        // send the token in a HTTP-only cookie
        res.cookie("token", token, cookieOptions).send();
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// GET api/users/login
// Authenticate User and get token
// Public access
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.user);

    try {
        // check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ errors: [ {msg: 'Incorrect User Credentials'} ] });
        }
    
        const isMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!isMatch) {
            return res.status(401).json({ errors: [ {msg: 'Incorrect User Credentials'} ] });    
        }
    
        // create and sign the token
        const token = generateToken(user._id);
    
        // send the token in a HTTP-only cookie
        res.cookie("token", token, cookieOptions);

        return res.json({
            _id: user._id,
            name: user.name
        });

      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
};

// GET api/users/logout
// Logout User
// Public access
const logout = async (req, res) => {
    // expire cookie and send back, which will be removed
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
};

// GET api/users/loggedIn
// Check if user is logged in
// Public access
const loggedIn = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json(false);
      }

      jwt.verify(token, process.env.JWT_SECRET);

      res.send(true);
    } catch (err) {
      res.json(false);
    }
};


module.exports = {
    loginUser,
    registerUser,
    logout,
    loggedIn
};