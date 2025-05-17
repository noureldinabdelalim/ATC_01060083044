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
        const token = createToken(user._id, user.name, user.role, user.phone,user.address,user.dob,user.nationalId)
        res.status(200).json({ email, name:name2, role:userRole , token , phone:user.phone, address:user.address, dob:user.dob, nationalId:user.nationalId });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message }); 
    }
};
const registerUser = async (req, res) => {
    const { name,phone, address, dob, nationalId, email,password } = req.body
    try {
        const user = await User.register( name,phone, address, dob, nationalId, email,password)
        const token = createToken(user._id, user.name, user.role, user.phone,user.address,user.dob,user.nationalId)
        const userRole = user.role
        res.status(200).json({email,name,role:userRole, token, phone:user.phone, address:user.address, dob:user.dob, nationalId:user.nationalId})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}

const requestOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        user.newestOTP = otp;
        user.otpExpiry = otpExpiresAt;
        await user.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD 
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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

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





module.exports = {loginUser, registerUser, requestOtp, verifyOtp}