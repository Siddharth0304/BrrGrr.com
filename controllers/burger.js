const Burger = require("../models/burger");
const Byob = require("../models/byob");
const User=require("../models/user");

module.exports.menu=async (req, res) => {
    const burgers = await Burger.find({});
    res.render('burger/menu.ejs', { burgers });
};

module.exports.item=async (req, res) => {
    const { id } = req.params;
    const burger = await Burger.findById(id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    });
    if (!burger) {
        req.flash('error', "Item Doesn't Exist");
        return res.redirect('/menu');
    }
    res.render('burger/show.ejs', { burger, ingredients: burger.ingredients, category: burger.category });
};

module.exports.addCart=(req, res) => {
    const { id } = req.params;
    if (!req.session.cart) req.session.cart = {};
    if (!req.session.cart[id]) {
        req.session.cart[id] = 1;
        req.flash('success', 'Added to Cart');
    } else {
        req.flash('success', 'Item Already Present In Cart');
    }
    res.redirect('/menu');
};

module.exports.cart=async (req, res) => {
    const cart = req.session.cart || {};
    const order = [];
    let total = 0;
    if (Object.keys(cart).length > 0) {
        for (const [key, value] of Object.entries(cart)) {
            const bur = await Burger.findById(key);
            const by=await Byob.findById(key);
            if (bur) {
                order.push({ burger: bur, quantity: value });
                total += bur.price * value;
            }
            if (by) {
                order.push({ burger: by, quantity: value });
                total += by.price * value;
            }            
        }
    }
    res.render('burger/cart.ejs', { order, total });
};

module.exports.increase=async (req, res) => {
    const { id } = req.params;
    if (req.session.cart && req.session.cart[id]) {
        req.session.cart[id]++;
    }
    res.redirect('/cart');
};

module.exports.decrease=async (req, res) => {
    const { id } = req.params;
    if (req.session.cart && req.session.cart[id]) {
        req.session.cart[id]--;
        if (req.session.cart[id] === 0) {
            delete req.session.cart[id];
            req.flash('success', 'Item Removed From Cart');
        }
    }
    res.redirect('/cart');
};

module.exports.burg=async(req,res)=>{
    let burger=await Burger.find({});
    let onlyBurgers=burger.filter((bur)=>{
        return bur.category==="burger";
    });
    //console.log(onlyBurgers);
    res.render("category/burger.ejs",{onlyBurgers});
};

module.exports.fries=async(req,res)=>{
    let burger=await Burger.find({});
    let onlyFries=burger.filter((bur)=>{
        return bur.category==="fries";
    });
    
    res.render("category/fries.ejs",{onlyFries});
};

module.exports.drinks=async(req,res)=>{
    let burger=await Burger.find({});
    let onlyDrinks=burger.filter((bur)=>{
        return bur.category==="drinks";
    });
    
    res.render("category/drinks.ejs",{onlyDrinks});
};

module.exports.sweet=async(req,res)=>{
    let burger=await Burger.find({});
    let onlySweets=burger.filter((bur)=>{
        return bur.category==="sweet";
    });
    
    res.render("category/sweets.ejs",{onlySweets});
};

module.exports.placeOrder=async(req,res)=>{
    const cart = req.session.cart;
    const user=await User.findById(req.user._id);
    for (const [key, value] of Object.entries(cart)) {
        const bur = await Burger.findById(key);
        user.order.push({item:bur,quantity:value,date:Date.now()});
        await user.save();
    }
    req.flash("success","Order has been placed");
    res.redirect("/menu");
};