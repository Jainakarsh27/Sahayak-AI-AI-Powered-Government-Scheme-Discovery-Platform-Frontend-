const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Check for the token in the 'Authorization' header
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Extract the actual token string
    const tokenString = token.split(' ')[1];

    try {
        // Verify token (uses the JWT_SECRET from your .env file)
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        
        // Add user payload to the request object
        req.user = decoded.user;
        next(); // Proceed to the protected route handler

    } catch (e) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = { protect };