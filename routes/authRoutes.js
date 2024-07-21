const authController = require('../controllers/AuthController');
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/error' }),
    (req, res) => {
        res.redirect('/auth/success');
    }
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/error' }),
    (req, res) => {
        res.redirect('/auth/success');
    }
);

module.exports = router;
