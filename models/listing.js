const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : String,
    image : {
        type: String,
        default: "https://www.istockphoto.com/photo/subsidi-house-from-government-real-estate-and-property-investment-residential-gm1443892103-482733021?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Farea&utm_medium=affiliate&utm_source=unsplash&utm_term=area%3A%3Avideo-affiliates%3Acontrol",
        set: (v) => v === "" ? "https://www.istockphoto.com/photo/subsidi-house-from-government-real-estate-and-property-investment-residential-gm1443892103-482733021?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Farea&utm_medium=affiliate&utm_source=unsplash&utm_term=area%3A%3Avideo-affiliates%3Acontrol" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;