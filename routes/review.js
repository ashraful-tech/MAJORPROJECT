const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review");
const Listing = require("../models/listing.js");
const flash = require("connect-flash");



//Validate Review
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => { el.message }).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
};


router.post("/", validateReview, wrapAsync(async (req, res) => {
    //console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Review Added Successfully");
    res.redirect(`/listings/${listing._id}`);
}));

//Delete review route

router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
})
);


module.exports = router;