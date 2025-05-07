const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const guestRoutes = require('./routes/guestRoutes')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

app.use((req,res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/user', userRoutes)
app.use('/guest', guestRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req,res) => {
    res.json({mssg: 'Welcome to my app'})
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


