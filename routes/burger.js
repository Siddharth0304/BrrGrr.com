const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Burger = require('../models/burger');
const { validateReview, saveRedirectUrl, isLoggedIn ,isQuery} = require('../middleware');
const User = require('../models/user');
const Byob = require('../models/byob');
const burgController=require("../controllers/burger");

router.get('/home', (req, res) => {res.render('burger/home.ejs');});

router.get('/menu',isQuery,wrapAsync(burgController.menu));

router.get('/menu/:id',isQuery, wrapAsync(burgController.item));

router.get('/add-to-cart/:id',isLoggedIn,isQuery,wrapAsync(burgController.addCart));

router.get('/cart',isQuery, wrapAsync(burgController.cart));

router.get('/cart/increase/:id',isLoggedIn,isQuery, wrapAsync(burgController.increase));

router.get('/cart/decrease/:id',isLoggedIn,isQuery, wrapAsync(burgController.decrease));

router.get('/burger',isQuery,burgController.burg);

router.get('/fries',isQuery,burgController.fries);

router.get('/drinks',isQuery,burgController.drinks);

router.get('/sweet',isQuery,burgController.sweet);

router.get("/place",isQuery,isLoggedIn,wrapAsync(burgController.placeOrder));

module.exports = router;
