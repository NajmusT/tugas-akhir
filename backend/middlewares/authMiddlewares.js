const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
    let token;

    if (req.header.authorization && req.header.authorization.startsWith('Bearer')) {
        try {
            token = req.header.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_OR_KEY)
            req.user = await User.findById(decoded._id).select('-password')
        } catch (error) {
            res.status(401).json('Not authorized')
        }
    }

    if (!token) {
        res.status(401).json('Not authorized, no token')
    }
}

module.exports = { protect }