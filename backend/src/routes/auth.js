const express = require('express');
const { body }  = require('express-validator');
const router    = express.Router();
const authCtrl  = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post(
  '/register',
  [
    body('firstName').notEmpty().trim().withMessage('First name is required'),
    body('lastName').notEmpty().trim().withMessage('Last name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('phone').matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),
  ],
  authCtrl.register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authCtrl.login
);

router.post('/logout',        authCtrl.logout);
router.post('/refresh-token', authCtrl.refreshToken);
router.post('/forgot-password', authCtrl.forgotPassword);
router.get('/me', protect, authCtrl.getMe);

module.exports = router;
