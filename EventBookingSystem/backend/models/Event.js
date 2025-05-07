const mongoose = require('mongoose')
const Schema = mongoose.Schema
const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    eventImage: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: false
    },
    userImages: {
        type: [String],
        required: false
    }
}, { timestamps: true })
module.exports = mongoose.model('Event', eventSchema)