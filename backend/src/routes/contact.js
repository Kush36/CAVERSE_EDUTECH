const express      = require('express');
const { body }     = require('express-validator');
const router       = express.Router();
const contactCtrl  = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

router.post(
  '/',
  [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().trim().withMessage('Subject is required'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  contactCtrl.submitContact
);

router.get('/',      protect, adminOnly, contactCtrl.getContacts);
router.put('/:id',   protect, adminOnly, contactCtrl.resolveContact);

module.exports = router;
