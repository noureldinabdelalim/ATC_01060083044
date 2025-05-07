const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: false
    },
    bookedEvents: {
        type: [Schema.Types.ObjectId],
        ref: 'Event',
        required: true
    },
    images: {
        type: [String],
        required: false
    }
}, { timestamps: true })

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare entered password with hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);
