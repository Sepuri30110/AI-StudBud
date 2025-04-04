const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required: true,
    },
    email:{
        type: String,
        unique:true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
},{timestamps:true})

module.exports = mongoose.model('users',model)