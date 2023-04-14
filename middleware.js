module.exports.isLoggedIn = (req, res, next) => {
    if(req.isUnauthenticated()){
        req.flash('error', 'you must be signed in first!');
        return res.redirect('/login');
    }
    next();
}