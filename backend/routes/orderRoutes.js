const express = require("express");
const Order = require("../models/order");
const {protect} = require("../middlewares/authMiddleware");

const route = express.Router();

//route to get all the order list

route.get("/my-orders",protect, async (req, res) => {
    try{
        const orders = await Order.find({user : req.user._id}).sort({createdAt : -1});
        return res.status(200).json(orders)
    }catch(err){
        console.error(err);
        return res.status(500).json({message : `Server Error: ${err}`})
    }
});

//route for getting data of particular order by id
route.get("/:id",protect, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate("user","name email")
        
        if(!order) {
            return  res.status(404).json({message : "Order not found"})
        };

        return res.status(200).json(order)
    }catch(err){
        console.error(err);
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})

module.exports = {
    orderRoute : route
}