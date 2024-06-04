const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Byob= require('../models/byob');
const byobController=require("../controllers/byob");
const {isLoggedIn} = require('../middleware');

router.get("/byob",isLoggedIn,byobController.customize)

router.post("/custom",wrapAsync(byobController.create));

module.exports=router;