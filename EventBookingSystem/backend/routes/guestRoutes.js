const express = require('express')
const router = express.Router()

const { loginUser, registerUser, requestOtp, verifyOtp } = require('../controllers/guestController')    

router.post('/login', loginUser)

router.post('/register',registerUser)

router.post('/requestOtp',requestOtp)

router.post('/verifyOtp',verifyOtp)






module.exports = router