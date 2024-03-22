const jwt = require('jsonwebtoken');
const User = require('./models/userdata');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = auth;