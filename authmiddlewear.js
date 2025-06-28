const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

function authMiddleware(req, res, next) {
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
}

const token = authHeader.split(' ')[1];

try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;  // attach user id to request
    next();
} catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
}
}
module.exports = authMiddleware;
