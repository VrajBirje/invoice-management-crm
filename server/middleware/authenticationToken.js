const authHelper = require('../helpers/authHelper');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    authHelper.verifyToken(token, (err, user) => {
        if (err) {
            console.error(err);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
