const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

main()
    .then(()=> {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });


async function main() {
   await mongoose.connect(MONGO_URL); 
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res) =>{
    res.send("Hi, i am ruchika");
})


//Index Route
app.get("/Listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
});


//New Route
app.get("/Listings/new", (req,res) =>{
    res.render("listings/new");
})


//Read: Show Route
app.get("/Listings/:id", async (req, res) => { 
    let {id} = req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/show", {listing});
});

//Create Route
app.post("/Listings", async (req,res)=>{
    const newListing = new Listing( req.body.Listing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route
app.get("/Listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/edit", {listing});
})

//Update route
app.put("/Listings/:id", async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.Listing}); 
    res.redirect(`/Listings/${id}`);
})

//Delete route
app.delete("/Listings/:id", async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/Listings");
})


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description : "By the Beach",
//         price: 1200,
//         location: "Calanguate, Goa",
//         country : "India",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// })

app.listen(8080, () =>{
    console.log("server is listening to port 8080");
})