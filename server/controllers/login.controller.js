const model = require('../model/user.model')

const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        console.log(req.body)
        const { name, password } = req.body;

        const user = await model.findOne({ "name": name })
        if (user && user.password === password) {
            jwt.sign(user.toObject(), "secret", (err, token) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json("Enable to create jwt : " + err)
                } else {
                    return res.status(200).json({ status: "success", token, name })
                }
            })
        }
        else{
            return res.status(401).json("Invalid credentials")
        }
    }
    catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await model.findOne({ "name": name })
        const user1 = await model.findOne({ "email": email })
        if (user) {
            return res.status(401).json("Name already exists")
        } else if (user1) {
            return res.status(401).json("Email already exists")
        } else {
            await model.create({ name: name, email: email, password: password })
            return res.status(200).json("SignUp Success")
        }
    }
    catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}


module.exports = {
    login,
    signup
}
