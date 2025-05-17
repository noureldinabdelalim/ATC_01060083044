
const User = require('../models/User')
const Event = require('../models/Event');


const jwt = require('jsonwebtoken')
const createToken = (_id, name, role) => {
    return jwt.sign({ _id, name, role }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const createAdmin = async (req,res) => {
    const { email, password, name, phone, Address, dob, nationalId } = req.body;
    try {
        const admin = await User.addAdmin(name, email, password, phone, Address, dob, nationalId);
        const token = createToken(admin._id, admin.name, admin.role)
        const userRole = admin.role
        res.status(200).json({email,name,role:userRole, token})
        console.log('Admin created successfully:', admin);
    } catch (error) {
        console.error('Error creating admin:', error.message);
        res.status(400).json(error.message)
    }
};
const deleteAdmin = async (req,res) => {
    const { email } = req.body;
    try {
        const admin = await User.findOneAndDelete(email);
        res.status(200).json({message: 'Admin deleted successfully'})
        console.log('Admin deleted successfully:', admin);
    } catch (error) {
        console.error('Error deleting admin:', error.message);
    }
};

module.exports = {
    createAdmin,
    deleteAdmin
}