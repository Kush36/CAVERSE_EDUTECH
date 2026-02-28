const express        = require('express');
const router         = express.Router();
const submissionCtrl = require('../controllers/submissionController');
const { protect, adminOnly } = require('../middleware/auth');
const upload         = require('../middleware/upload');

router.use(protect);

router.post('/upload', upload.single('file'), submissionCtrl.uploadSubmission);
router.get('/',        submissionCtrl.getSubmissions);
router.get('/:id',     submissionCtrl.getSubmissionById);
router.put('/:id',     adminOnly, submissionCtrl.updateSubmissionStatus);
router.post('/:id/evaluate', adminOnly, submissionCtrl.evaluateSubmission);

module.exports = router;
