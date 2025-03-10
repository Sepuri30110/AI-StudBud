const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ "message": "Not athorized" })
            return;
        }
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, "secret", (err, data) => {
            if (!err) {
                req.user = data.user
                next()
            }
            else
                res.status(300).json({ "message": "Not athorized" })
        })
    }
    catch (error) {
        res.status(404).json({ "message": "unable to verify" })
    }
}

module.exports = {
    verifyToken
}