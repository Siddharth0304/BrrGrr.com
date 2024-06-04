const mongoose=require("mongoose");
const initData=require("./data.js");
const Burger=require("../models/burger.js");

main().then(()=>{
    console.log("Connection Successful")
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/exposys");
}

const initDB= async()=>{
    await Burger.deleteMany({})
    await Burger.insertMany(initData.data);
    console.log("Saved");
    // list.save();
}

initDB();