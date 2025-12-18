const express = require("express");
const Subscriber = require("../models/subcriber");

const route = express.Router();

//route for subscription in newsletter

route.post("/subscribe",async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(404).json({message : "Email is not found!!"});
    }

    try{
        const subscribed = await Subscriber.findOne({email : email});
        
        if(subscribed) {
            return res.json({message : "Email alredy subscribed"});
        }

        const result = new Subscriber({email})
        await result.save();

        return res.json({message : "Email subcribed successsfully",result})
            
    }catch(err){
        console.error(err)
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})

module.exports = {
    subscribeRoute : route
}