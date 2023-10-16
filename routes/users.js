const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const auth = require('../controllers/auth');
const {storeReturnTo} = require("../middleware");

router.route('/register')
    .get(auth.renderRegister)
    .post(catchAsync(auth.register));

router.route('/login')
    .get(auth.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { 
    failureFlash: true, 
    failureRedirect:"/login",  
    keepSessionInfo: true, 
    failureMessage: true
}), auth.login);

router.get('/logout', auth.logout); 

router.get('/privacy-policy', auth.renderPP); 

module.exports = router;