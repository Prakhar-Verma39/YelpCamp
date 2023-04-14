const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const auth = require('../controllers/auth');

router.get('/register', auth.renderRegister);

router.post('/register', catchAsync(auth.register));

router.get('/login', auth.renderLogin);

router.post('/login', passport.authenticate('local', { 
    failureFlash: true, 
    failureRedirect:"/login",  
    keepSessionInfo: true, 
    failureMessage: true
}), auth.login);

router.get('/logout', auth.logout); 

module.exports = router;