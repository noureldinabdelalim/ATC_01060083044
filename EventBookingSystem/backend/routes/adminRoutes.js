const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const { createEvent, getEvents, getEventsSortedByDate, updateEvent, deleteEvent,
    getEventById
 } = require('../controllers/eventController')
const { createAdmin, deleteAdmin } = require('../controllers/adminController')
const requireAuth = require('../middlewares/requireAuth')
router.use(requireAuth)

router.get('/events', getEvents)
router.get('/:id', getEventById)
router.get('/event/sorted', getEventsSortedByDate)


router.post('/event', createEvent)

router.delete('/event/:id', deleteEvent)

router.put('/event/:id', updateEvent)

router.post('/addAdmin', createAdmin)
router.delete('/deleteAdmin', deleteAdmin)


module.exports = router