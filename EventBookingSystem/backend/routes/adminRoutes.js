const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const { createEvent, getEvents, getEventsSortedByDate, updateEvent, deleteEvent,
    getEventById
 } = require('../controllers/eventController')

router.get('/events', getEvents)
router.get('/:id', getEventById)
router.get('/event/sorted', getEventsSortedByDate)


router.post('/event', createEvent)

router.delete('/event/:id', deleteEvent)

router.put('/event/:id', updateEvent)


module.exports = router