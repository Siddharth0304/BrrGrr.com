const mongoose=require("mongoose");
const prices=[
    { name: "Roasted Garlic", price: 79, category: "bread" },
    { name: "Parmesan Oregano", price: 89, category: "bread" },
    { name: "Multigrain Honey Oats", price: 89, category: "bread" },
    { name: "Brioche", price: 69, category: "bread" },
    { name: "Multigrain", price: 79, category: "bread" },
    { name: "White Italian", price: 69, category: "bread" },
    { name: "Grilled With Cheese Slice", price: 39, category: "style" },
    { name: "Non-Toasted", price: 9, category: "style" },
    { name: "Toasted", price: 29, category: "style" },
    { name: "Non-Toasted With Cheese Slice", price: 29, category: "style" },
    { name: "Toasted Bread With Mozzarella Cheese", price: 49, category: "style" },
    { name: "Grilled", price: 29, category: "style" },
    { name: "Fried Chicken", price: 79, category: "patty" },
    { name: "Smash Mutton Patty", price: 89, category: "patty" },
    { name: "Tuna", price: 99, category: "patty" },
    { name: "Paneer", price: 79, category: "patty" },
    { name: "Mushroom", price: 89, category: "patty" },
    { name: "Aloo Tikki", price: 69, category: "patty" },
    { name: "Lettuce", price: 19, category: "vegetables" },
    { name: "Onions", price: 9, category: "vegetables" },
    { name: "Cucumber", price: 9, category: "vegetables" },
    { name: "Salt & Pepper", price: 9, category: "vegetables" },
    { name: "Capsicum", price: 9, category: "vegetables" },
    { name: "Tomato", price: 9, category: "vegetables" },
    { name: "Jalapenos", price: 19, category: "vegetables" },
    { name: "Pickle", price: 19, category: "vegetables" },
    { name: "Tandoori Mayo", price: 39, category: "sauce" },
    { name: "Sweet Mayo", price: 29, category: "sauce" },
    { name: "Mint Mayo", price: 39, category: "sauce" },
    { name: "Barbeque Sauce", price: 39, category: "sauce" },
    { name: "Honey Mustard", price: 39, category: "sauce" },
    { name: "Red Chilli Sauce", price: 29, category: "sauce" },
    { name: "Ranch", price: 49, category: "sauce" },
    { name: "Hummus", price: 49, category: "sauce" }
];
const Byob=require("../models/byob");

main().then(()=>{
    console.log("Connection Successful")
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/exposys");
}

const initDB= async()=>{
    await Byob.deleteMany({})
    await Byob.insertMany(prices);
    console.log("Saved");
    // list.save();
}

initDB();