const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const router = express.Router()
const {  getEvents, getEventsSortedByDate, addNewUserImage,
    getEventById
 } = require('../controllers/eventController')
const { cancelBooking, bookEvent, getMyBookings } = require('../controllers/userController')

router.use(requireAuth)

router.get('/', (req,res) => {
    res.json({mssg: 'Homepage masalan'})
})

router.patch('/event/:id', addNewUserImage)
router.get('/event', getEvents)
router.get('/event/sorted', getEventsSortedByDate)
router.get('/event/:id', getEventById)

router.delete('/cancel/:id', cancelBooking )
router.post('/book/:id', bookEvent)
router.get('/my-bookings', getMyBookings)



module.exports = router