const User = require('../models/User')

const loginUser = async (req, res) => {
    const { email, password } = req.body
    res.json({ mssg: 'Login user' })

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ mssg: 'User not found' })
        }

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
        res.status(200).json({email, user})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}


module.exports = {loginUser, registerUser}