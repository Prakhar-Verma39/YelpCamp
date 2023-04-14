const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const auth = require('../controllers/auth');

router.route('/register')
    .get(auth.renderRegister)
    .post(catchAsync(auth.register));

router.route('/login')
    .get(auth.renderLogin)
    .post(passport.authenticate('local', { 
    failureFlash: true, 
    failureRedirect:"/login",  
    keepSessionInfo: true, 
    failureMessage: true
}), auth.login);

router.get('/logout', auth.logout); 

module.exports = router;