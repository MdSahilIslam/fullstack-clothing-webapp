const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
    },
    subscribedAt : {
        type : Date,
        default : Date.now,
    }
});

const Subscriber = mongoose.model("Subscriber",subscriberSchema);

module.exports = Subscriber