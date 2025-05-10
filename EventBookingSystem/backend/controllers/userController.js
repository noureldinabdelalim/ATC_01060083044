const User = require('../models/User')
const Event = require('../models/Event');



const bookEvent = async (req, res) => {
    const { id: eventId } = req.params; 
    const user = req.user; 

    try {
        // Check if the event exists
        
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if there are enough available tickets
        if (event.availableTickets < 1) {
            return res.status(400).json({ error: 'Not enough available tickets' });
        }

        // Update the event's available tickets
        event.availableTickets -= 1;
        await event.save();

        if (!user.bookedEvents) {
            user.bookedEvents = []; // Initialize bookedEvents if it is undefined
        }
        // Add the booking to the user's bookings array
        user.bookedEvents.push( eventId );
        console.log(user.bookedEvents)

        await user.save();

        res.status(200).json({ message: 'Booking successful', event, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to book event' });
    }
};
const getMyBookings = async (req, res) => {
    const user = req.user; 

    try {
        const userWithBookings = await User.findById(user._id).populate('bookedEvents');
        console.log(userWithBookings.bookedEvents)
        
        res.status(200).json(userWithBookings.bookedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

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
const cancelBooking = async (req, res) => {
    const { id: eventId } = req.params; 
    const user = req.user; 

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const eventIndex = user.bookedEvents.indexOf(eventId);
        if (eventIndex === -1) {
            return res.status(400).json({ error: 'Event not found in user bookings' });
        }

        user.bookedEvents.splice(eventIndex, 1);
        console.log(user.bookedEvents)
        await user.save();

        event.availableTickets += 1;
        await event.save();

        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
};




module.exports = {bookEvent, getMyBookings, cancelBooking}