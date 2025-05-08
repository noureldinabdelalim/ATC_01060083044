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
    totalTickets:{
        type: Number,
        required: true
    },
    availableTickets: {
        type: Number
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
    },
    price: {
        type: Number,
        required: true
    },
    venue: {
        type: String,
        required: true
    }
}, { timestamps: true })
eventSchema.pre('save', function (next) {
    if (this.isNew && this.availableTickets === undefined) {
        this.availableTickets = this.totalTickets;
    }
    next();
});
module.exports = mongoose.model('Event', eventSchema)