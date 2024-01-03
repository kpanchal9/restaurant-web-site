const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Food = require("./models/foods.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/foodinfo";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));




app.get("/foods",async(req,res)=>{
    const allFoods = await Food.find({});
    res.render("index.ejs",{allFoods});
})

app.get("/admin/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/admin",async(req,res)=>{
    const newFood = new Food(req.body.listing);
    await newFood.save();
    res.redirect("/admin");
})

app.get("/admin",async(req,res)=>{
    const allFoods = await Food.find({});
    res.render("admin.ejs",{allFoods});
})

app.get("/admin/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let food =  await Food.findById(id);
    res.render("edit.ejs",{food});
});

app.put("/admin/:id",async(req,res)=>{
    let {id} = req.params;
    //let {title,description,image,price,} = req.body;
    await Food.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/admin");
})

app.delete("/admin/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedFood = await Food.findByIdAndDelete(id);
    console.log(deletedFood);
    res.redirect("/admin");
})

app.post("/",async(req,res)=>{
    const newFood = new Food(req.body.listing);
    await newFood.save();
    res.redirect("/");
});


app.listen(8080,()=>{
    console.log("prot is listing on 8080");
})