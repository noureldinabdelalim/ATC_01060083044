const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const { getEvents, getEventsSortedByDate, 
    getEventById
 } = require('../controllers/eventController')




router.get('/', getEvents)
router.get('/:id', getEventById)
router.get('/sorted', getEventsSortedByDate)

module.exports = router