const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('./tokenBlacklist');

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send("Authorization failed. No access token.");
    }

    if (isBlacklisted(token)) {
        return res.status(403).send("Token is invalidated.");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).send("Could not verify token");
        }
        req.user = user;
        console.log("Authenticated user:", user);
        next();
    });
};

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        async (req, res, next) => {
            const user = await User.findById(req.user.id);
            if (!user || (roles.length && !roles.includes(user.role))) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        }
    ];
};

module.exports = { authenticate, authorize };