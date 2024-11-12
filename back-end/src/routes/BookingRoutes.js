const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.delete('/:id', bookingController.deleteID);
router.get('/', bookingController.getBookings);
router.post('/', bookingController.show);

module.exports = router;