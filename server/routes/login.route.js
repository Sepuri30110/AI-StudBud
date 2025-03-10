const express=require('express')
const routes=express.Router()
const { login, signup } = require('../controllers/login.controller');

routes.post('/login',login)
routes.post('/signup',signup)

module.exports = routes; 