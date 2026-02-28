const express      = require('express');
const router       = express.Router();
const questionCtrl = require('../controllers/questionController');
const { protect }  = require('../middleware/auth');

router.use(protect);

router.get('/',            questionCtrl.getQuestions);
router.get('/statistics',  questionCtrl.getStatistics);
router.get('/:id',         questionCtrl.getQuestionById);
router.post('/:id/attempt',questionCtrl.attemptQuestion);

module.exports = router;
