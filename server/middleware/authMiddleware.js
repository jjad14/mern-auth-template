const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = require('../models/userModel');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errors: [ {msg: 'Access is Unauthorized'} ] });
    } 

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // verified.user is the users id
    req.user = verified.user; 
    // req.user = await User.findById(verified.user).select('-password');

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errors: [ {msg: 'Access is Unauthorized'} ] });
  }
};

module.exports = auth;
