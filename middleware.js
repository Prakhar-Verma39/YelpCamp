const { campgroundSchema, reviewSchema } = require('./schemas.js');
const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
        //store the url they are requesting!
        // console.log(req.path, req.originalUrl)
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'you must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        const { id } = req.params;

        req.flash('error', msg);

        if (id)
            return res.redirect(`/campgrounds/${id}/edit`);
        else
            return res.redirect(`/campgrounds/new`);

    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}