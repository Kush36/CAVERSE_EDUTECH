const express    = require('express');
const router     = express.Router();
const newsCtrl   = require('../controllers/newsController');

router.get('/',        newsCtrl.getNews);
router.get('/featured',newsCtrl.getFeaturedNews);

module.exports = router;
