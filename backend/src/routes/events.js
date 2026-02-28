const express    = require('express');
const router     = express.Router();
const eventCtrl  = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

router.get('/',                     eventCtrl.getEvents);
router.get('/my-registrations', protect, eventCtrl.getMyRegistrations);
router.get('/:id',                  eventCtrl.getEventById);
router.post('/:id/register', protect, eventCtrl.registerForEvent);

module.exports = router;
