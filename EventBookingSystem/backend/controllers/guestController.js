const User = require('../models/User')
const jwt = require('jsonwebtoken')
const createToken = (_id, name, role) => {
    return jwt.sign({ _id, name, role }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
const bcrypt = require('bcrypt')
const loginUser = async (req, res) => {
    const { email, password } = req.body
    // res.json({ mssg: 'Login user' })

    try {
        const user = await User.login(email, password )
        const name2 = user.name
        const token = createToken(user._id, user.name, user.role)
        res.status(200).json({ email, name:name2 , token })
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ mssg: 'Error logging in', error })
    }
}
const registerUser = async (req, res) => {
    const { name,phone, address, dob, nationalId, email,password } = req.body
    try {
        const user = await User.register( name,phone, address, dob, nationalId, email,password)
        const token = createToken(user._id, user.name, user.role)
        res.status(200).json({email,name, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}


module.exports = {loginUser, registerUser}