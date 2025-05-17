const Event = require('../models/Event');
const mongoose = require('mongoose')
createEvent = async (req, res) => {


    const { title, description, date,tag, time, location, eventImage, totalTickets, price, venue, extraImages } = req.body

    
    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }

    if (!date) {
        emptyFields.push('date')
    }
    if (!time) {
        emptyFields.push('time')
    }
    if (!location) {
        emptyFields.push('location')
    }
    if (!totalTickets) {
        emptyFields.push('totalTickets')
    }
    if (!price) {
        emptyFields.push('price')
    }
    if (!venue) {
        emptyFields.push('venue')
    }
    if (!extraImages) {
        emptyFields.push('extraImages')
    }
        if (!tag) {
        emptyFields.push('tag')

    }

    if (!eventImage) {
        return res.status(400).json({mssg: 'Please provide an image'})
    }
    if (totalTickets <= 0) {
        return res.status(400).json({mssg: 'Tickets must be greater than 0'})
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({mssg: 'Please fill in all fields', emptyFields})
    }
    
    try {
        const event = await Event.create({title,description,date,time,location,eventImage,totalTickets,availableTickets: totalTickets, price, venue, extraImages, tag})

        
        res.status(200).json({mssg: 'Event created successfully', event: {
            _id: event._id, 
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location,
            eventImage: event.eventImage,
            availableTickets: event.availableTickets,
            totalTickets: event.totalTickets,
            price: event.price,
            venue: event.venue,
            extraImages: event.extraImages,
            tag: event.tag

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
    const updates = req.body;

    try {
         const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        const ticketsBooked = existingEvent.totalTickets - existingEvent.availableTickets;

        if (updates.totalTickets !== undefined) {
            const newTotalTickets = updates.totalTickets;

            if (newTotalTickets < ticketsBooked) {
                return res.status(400).json({
                    error: `Total tickets cannot be less than the number of tickets already booked (${ticketsBooked}).`
                });
            }

            updates.availableTickets = newTotalTickets - ticketsBooked;
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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