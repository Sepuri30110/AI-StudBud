const express=require('express')
const routes=express.Router()
const {studyPlan} = require('../controllers/user.controller')

routes.post('/studbud',studyPlan)

module.exports=routes