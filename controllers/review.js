const Burger = require("../models/burger");
const Review = require("../models/reviews");

module.exports.createReview=async(req,res)=>{
    let {id}=req.params;
    let newReview=new Review(req.body.review); 
    let burger=await Burger.findById(id);
    newReview.author=req.user._id;
    burger.reviews.push(newReview);
    await newReview.save();
    await burger.save();
    req.flash("success","New Review Created");
    res.redirect(`/menu/${burger._id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Burger.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/menu/${id}`);
};