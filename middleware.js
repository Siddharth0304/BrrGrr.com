const Burger = require("./models/burger");
const Review = require("./models/reviews");
const { reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.session.tempCart = req.session.cart;
        req.flash("error","You must me logged in.");
        res.redirect("/login");
    }
    next();
    
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let erMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,error);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(res.locals.curruser && !review.author._id.equals(res.locals.curruser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isQuery = async (req, res, next) => {
    let fin = req.query.item;
    if(fin && fin.length>0){
        try{
            const capitalized=fin.charAt(0).toUpperCase()+fin.slice(1);
            let burgers=await Burger.find({name:{$regex:capitalized,$options:'i'}});
            if(burgers.length>0){
                return res.render("burger/search.ejs", { burgers });               
            } 
            else{
                req.flash("error","No items found");   
                return res.redirect("/menu");         
            }
        } 
        catch(error){
            console.error(error);
            req.flash("error", "An error occurred while searching for item");
            return res.redirect("/menu");
        }
    } 
    next();
}