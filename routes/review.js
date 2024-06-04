const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const revController=require("../controllers/review.js");

const {validateReview,isLoggedIn,isReviewAuthor,isQuery}=require("../middleware.js");

router.post("/",isLoggedIn,validateReview,wrapAsync(revController.createReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(revController.destroyReview));

module.exports=router;