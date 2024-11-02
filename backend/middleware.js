const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers

    if (!token) return res.sendStatus(403); // No token provided

    // Verify token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Attach decoded user to the request object
        next(); // Pass control to the next middleware or route handler
    });
};

module.exports = authenticateToken;
