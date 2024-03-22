const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: "Access denied. Token is required." });
    }
    
    const token = authorizationHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = { verifyToken };