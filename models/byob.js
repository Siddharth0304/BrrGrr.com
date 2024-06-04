const express=require("express");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const byobSchema=new Schema({
    name:String,
    price:Number,
    category:String
});

const Byob=mongoose.model("Byob",byobSchema);
module.exports=Byob;