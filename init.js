const mongoose = require('mongoose');
const chat = require("./models/chat.js");


main()
.then(()=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

};

let allchats = [
    {
        from:"neha",
        to:"preeti",
        msg:"send me notes for exam",
        created_at:new Date(),
    }, 
    {
        from:"rohit",
        to:"mohit",
        msg:"teach me js callback",
        created_at:new Date(),
    },
    {
        from:"amit",
        to:"sumit",
        msg:"how are you",
        created_at:new Date(),
    },
    {
        from:"tony",
        to:"peter",
        msg:"love you 3000",
        created_at:new Date(),
    }
];

chat.insertMany(allchats);