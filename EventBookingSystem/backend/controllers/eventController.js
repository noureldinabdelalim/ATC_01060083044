const Event = require('../models/Event');
const mongoose = require('mongoose')
createEvent = async (req, res) => {

    const { title, description, date, time, location, eventImage, availableTickets } = req.body
    try {
        const event = await Event.create({title,description,date,time,location,eventImage,availableTickets
        })
        res.status(200).json({mssg: 'Event created successfully', event: {
            _id: event._id, 
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location,
            eventImage: event.eventImage,
            availableTickets: event.availableTickets,
        }})
    }
    catch (error) {
        console.error(error)
        res.status(400).json({mssg: 'Error creating event', error})
    }


}
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({createdAt: -1})
        res.status(200).json(events)
    } catch (error) {
        console.error(error)
        res.status(400).json({mssg: 'Error getting events', error})
    }
}
const getEventById = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({mssg: 'Invalid event ID'})
    }
    try {
        const event = await Event.findById(id)
        res.status(200).json(event)
    } catch (error) {
        console.error(error)
        res.status(400).json({mssg: 'Cant find event', error})
    }
}
const getEventsSortedByDate = async (req, res) => {
    try {
        const events = await Event.find({}).sort({date: 1})
        res.status(200).json(events)
    } catch (error) {
        console.error(error)
        res.status(400).json({mssg: 'Error getting events', error})
    }
}
const deleteEvent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({mssg: 'Invalid event ID'})
    }
    try {
        const event = await Event.findByIdAndDelete({_id: id})
        res.status(200).json({mssg: 'Event deleted successfully', event})
    } catch (error) {
        console.error(error)
        res.status(400).json({mssg: 'Error deleting event', error})
    }
}
const updateEvent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({mssg: 'Invalid event ID'})
    }
    const { title, description, date, time, location, eventImage,availableTickets } = req.body
    try {
        const event = await Event.findByIdAndUpdate({_id: id}, {title,description,date,time,location,eventImage,availableTickets}, {new: true})
        res.status(200).json({mssg: 'Event updated successfully', event})
    } catch (error) {
        console.error(error)
        res.status(400).json({mssg: 'Error updating event', error})
    }
}

const addNewUserImage = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({mssg: 'Invalid event ID'})
    }
    const { userImages } = req.body
    if (!userImage) {
        return res.status(400).json({ mssg: 'No image provided' });
    }
    try {
        const event = await Event.findByIdAndUpdate(
            { _id: id },
            { $push: { userImages: userImage } }, 
            { new: true } 
        )
        res.status(200).json({mssg: 'User image added successfully', event})
    } catch (error) {
        console.error(error)
        res.status(400).json({mssg: 'Error adding user image', error})
    }
}







module.exports = {
    createEvent,
    getEvents,
    getEventsSortedByDate,
    deleteEvent,
    updateEvent,
    getEventById,
    addNewUserImage
}