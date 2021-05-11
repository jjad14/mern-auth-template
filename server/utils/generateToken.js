const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({user: id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

module.exports = generateToken;