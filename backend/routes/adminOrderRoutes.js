const express = require('express');
const Order = require('../models/order');
const {protect, admin} = require('../middlewares/authMiddleware');

const route = express.Router();

//get all orders for admin
route.get("/", protect, admin,  async (req, res) => {
    try{
        const orders = await Order.find({}).populate("user","name email");

        if(orders.length === 0) {
            return res.status(404).json({message : "Order not found"})
        }

        return res.status(200).json(orders)
    }catch(err){
        console.error(err)
        return res.status(500).json({message : `Server Error: ${err}`})
    }
});

//put requiest for updaTING EXISTING ORDER

route.put("/:id", protect, admin, async (req, res) => {
    try{
        const {status} = req.body;

        const order = await Order.findById(req.params.id).populate("user", "name email");
        if(!order) {
            return res.status(404).json({message : "Order Not Found!!"})
        }

        order.status = status || order.status;
        order.isDelivered = status === "Delivered"? true: false;
        order.deliveredAt = status === "Delivered"? Date.now() : undefined;
        await order.save();

        return res.status(200).json(order)
    }catch(err) {
        console.error(err);
        return res.status(500).json({message : `Server Error: ${err}`})
    }

})

//deleting order from admin

route.delete("/:id", protect, admin, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);

        if(order) {
            await order.deleteOne();
            return res.status(200).json({message : "Order Deleted Successfully"})
        }else{
            return res.status(404).json({message : "Order not found!!"})
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})

module.exports = {
    adminOrderRoute : route
}