const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../BackendBuzzz/src/User/Service/RegisterUserService');
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' }); // Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token, authorization denied' }); // Forbidden
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

