const express = require("express");
const app = express(); 
const mongoose = require('mongoose');
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extented:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}





// index route

app.get("/chats",async(req,res)=>{
    let chats = await chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})
app.get("/",(req,res)=>{
    res.send("root is working");
});

// new route

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

// create route
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newchat = new chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newchat.save().then(res=>{console.log("chat was saved")}).catch(err=>{console.log(err)});
    res.redirect("/chats");
})

// edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chats= await chat.findById(id);
    res.render("edit.ejs",{chats});
})

// update route
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatechat = await chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updatechat);
    res.redirect("/chats");
})

// destroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})