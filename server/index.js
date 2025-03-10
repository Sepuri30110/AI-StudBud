const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 4999

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/StudBud")
.then(res=>console.log("Connected to MongoDB Successfully"))
.catch(err=>console.log("Error connecting MongoDB"))

const loginRoute = require('./routes/login.route')
const userRoute = require('./routes/user.route')

const {verifyToken} = require('./middlewares/auth')

app.use("/",loginRoute);
app.use("/user",verifyToken,userRoute)


app.listen(port,()=>{
    console.log(`Server is listening on port `)
})