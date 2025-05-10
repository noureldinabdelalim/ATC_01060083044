const User = require('../models/User')
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken')
const createToken = (_id, name, role) => {
    return jwt.sign({ _id, name, role }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
const bcrypt = require('bcrypt')

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const name2 = user.name
        const userRole = user.role
        const token = createToken(user._id, user.name, user.role)
        res.status(200).json({ email, name:name2, role:userRole , token })
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message }); 
    }
};
const registerUser = async (req, res) => {
    const { name,phone, address, dob, nationalId, email,password } = req.body
    try {
        const user = await User.register( name,phone, address, dob, nationalId, email,password)
        const token = createToken(user._id, user.name, user.role)
        const userRole = user.role
        res.status(200).json({email,name,role:userRole, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}

const requestOtp = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP expiration time (e.g., 10 minutes from now)
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Save OTP and expiration time in the database
        user.newestOTP = otp;
        user.otpExpiry = otpExpiresAt;
        await user.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.EMAIL_PASSWORD // Your email password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};
const verifyOtp = async (req, res) => {
    const { email, otp, newPass } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the OTP matches and is not expired
        if (user.newestOTP !== otp || user.otpExpiry < new Date()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // Clear the OTP fields after successful verification
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();
        await User.updatePass(email,newPass)


        res.status(200).json({ message: 'OTP verified successfully and password changed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
};

// const createAdmin = async (req,res) => {
//     const { email, password, name, phone, Address, dob, nationalId } = req.body;
//     try {
//         const admin = await User.addAdmin(name, email, password, phone, Address, dob, nationalId);
//         const token = createToken(admin._id, admin.name, admin.role)
//         const userRole = admin.role
//         res.status(200).json({email,name,role:userRole, token})
//         console.log('Admin created successfully:', admin);
//     } catch (error) {
//         console.error('Error creating admin:', error.message);
//     }
// };
// const deleteAdmin = async (req,res) => {
//     const { email } = req.body;
//     try {
//         const admin = await User.findOneAndDelete(email);
//         res.status(200).json({message: 'Admin deleted successfully'})
//         console.log('Admin deleted successfully:', admin);
//     } catch (error) {
//         console.error('Error deleting admin:', error.message);
//     }
// };



module.exports = {loginUser, registerUser, requestOtp, verifyOtp}