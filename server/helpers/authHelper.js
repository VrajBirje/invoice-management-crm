const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

// Function to generate a token
exports.generateToken = (user, callback) => {
    jwt.sign({ user }, secretKey, { expiresIn: '1h' }, callback);
};

// Function to verify a token
exports.verifyToken = (token, callback) => {
    jwt.verify(token, secretKey, callback);
};
