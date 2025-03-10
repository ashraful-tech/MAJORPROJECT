const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    }).catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
};


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Route Directory
app.get("/", (req, res) => {
    res.send("Root is working");
});



//Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});



//New Route req
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing })
});

//Create route
app.post("/listings", async (req, res) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route req
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const delItem = await Listing.findByIdAndDelete(id);
    console.log(delItem);
    res.redirect("/listings");
})



// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My 3rd Project",
//         description: "Its is for testing purporse",
//         price: 1400,
//         location: "Dinajpur",
//         country: "Bangladesh",
//     });
//     await sampleListing.save().then((res)=>{
//         console.log(res);
//     }).catch((err)=> console.log(err));
//     res.send("success");
// });

app.listen(port, () => {
    console.log("server is listening to port 8080");
});