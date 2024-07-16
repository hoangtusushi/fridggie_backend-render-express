const User = require('../models/User');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        async (req, res, next) => {
            const user = await User.findById(req.userId);
            if (!user || (roles.length && !roles.includes(user.role))) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        }
    ];
};

module.exports = { verifyToken, authorize };