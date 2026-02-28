const express  = require('express');
const router   = express.Router();
const studentCtrl = require('../controllers/studentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/dashboard',    studentCtrl.getDashboard);
router.get('/profile',      studentCtrl.getProfile);
router.put('/profile',      studentCtrl.updateProfile);
router.get('/enrollments',  studentCtrl.getEnrollments);
router.post('/enrollments', studentCtrl.enrollInCourse);

module.exports = router;
