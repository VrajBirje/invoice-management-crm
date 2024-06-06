const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

exports.generateToken = (user, callback) => {
    jwt.sign({ user }, secretKey, { expiresIn: '1h' }, callback);
};
