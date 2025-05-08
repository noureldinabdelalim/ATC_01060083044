const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const router = express.Router()
const {  getEvents, getEventsSortedByDate, addNewUserImage,
    getEventById
 } = require('../controllers/eventController')

router.use(requireAuth)

router.get('/', (req,res) => {
    res.json({mssg: 'Homepage masalan'})
})

router.patch('/event/:id', addNewUserImage)
router.get('/event', getEvents)
router.get('/event/sorted', getEventsSortedByDate)
router.get('/event/:id', getEventById)



module.exports = router