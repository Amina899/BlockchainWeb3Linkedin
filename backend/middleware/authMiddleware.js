const jwt = require('jsonwebtoken');
const {secret} = require('../configuration/config');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "You are not authorised! Try to login first or register first!"})
        }
        const decodedData  = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "You are not authorised! Try to login first or register first!"})
    }
}