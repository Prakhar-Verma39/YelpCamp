module.exports.isLoggedIn = (req, res, next) => {
    console.log("REQ.USER...", req.user);
    if(req.isUnauthenticated()){
        req.flash('error', 'you must be signed in first!');
        return res.redirect('/login');
    }
    next();
}