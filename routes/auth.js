const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const loginAuthMiddle = require('../middleware/loginAuthMiddle');
const signupAuthMiddle = require('../middleware/signupAuthMiddle');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', loginAuthMiddle, authController.postLogin);

router.post('/signup', signupAuthMiddle, authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getResetPassword);

router.post('/reset-password', authController.postResetPassword);

module.exports = router;
