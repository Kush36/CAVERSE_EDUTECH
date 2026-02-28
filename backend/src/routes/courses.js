const express    = require('express');
const router     = express.Router();
const courseCtrl = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.get('/',                   courseCtrl.getCourses);
router.get('/:id',                courseCtrl.getCourseById);
router.get('/:id/questions', protect, courseCtrl.getCourseQuestions);
router.get('/:id/progress',  protect, courseCtrl.getCourseProgress);

module.exports = router;
