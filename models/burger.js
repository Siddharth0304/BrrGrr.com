const express=require("express");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const burgerSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:String,
    price:{
        type:Number,
        min:0,
    },
    spice:String,
    ingredients:[String],
    image:String,
    category:{
        type:String,
        enum:["burger","fries","drinks","sweet"],
    },
    eat:{
        type:String,
        enum:["veg","non-veg"],
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
});

const Burger=mongoose.model("Burger",burgerSchema);
module.exports=Burger;