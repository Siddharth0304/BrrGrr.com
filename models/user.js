const mongoose=require("mongoose");
const Burger = require("./burger");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    order:[
        {
            item:{
                type:Schema.Types.ObjectId,
                ref:"Burger",
            },
            quantity:Number,  
            date:Date,  
        },
    ]
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);
module.exports=User;