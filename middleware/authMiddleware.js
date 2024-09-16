const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

// Verify token middleware
exports.protect = (req, res, next) => {
    // Access the authorization header
    const authHeader = req.headers.authorization;
    
    // Check if the header is present and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized access, token missing or invalid' });
    }

    // Extract token from the 'Bearer token' format
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token and attach the decoded user information to the request object
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Restrict access to certain roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // Ensure the user exists on the request object (set by the protect middleware)
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: Access denied' });
        }
        next(); // Proceed if the user's role is allowed
    };
};
