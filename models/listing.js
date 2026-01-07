const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description : String,
    image : {
        type: String,
        default : "https://unsplash.com/photos/mobile-notification-badge-symbol-on-orange-background-safety-warning-sign-warning-on-dangers-of-smartphone-fraud-online-scam-alerts-data-security-3d-render-illustration-Rl9BcV5H04Q",
        set: (v) =>
            v === "" ? "https://unsplash.com/photos/mobile-notification-badge-symbol-on-orange-background-safety-warning-sign-warning-on-dangers-of-smartphone-fraud-online-scam-alerts-data-security-3d-render-illustration-Rl9BcV5H04Q" : v,

    },
    price : Number,
    location : String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;