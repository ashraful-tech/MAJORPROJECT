const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
};

//Route Directory
app.get("/", (req,res)=>{
    res.send("Root is working");
});

app.get("/testListing", async (req,res)=>{
    let sampleListing = new Listing({
        title: "My 3rd Project",
        description: "Its is for testing purporse",
        price: 1400,
        location: "Dinajpur",
        country: "Bangladesh",
    });
    await sampleListing.save().then((res)=>{
        console.log(res);
    }).catch((err)=> console.log(err));
    res.send("success");
});

app.listen(port,()=>{
    console.log("server is listening to port 8080");
});