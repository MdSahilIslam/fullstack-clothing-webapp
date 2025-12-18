const express = require("express");
const Checkout = require("../models/checkout");
const Order = require("../models/order")
const Cart = require("../models/cart");
const User = require("../models/user");
const {protect} = require('../middlewares/authMiddleware')

const route = express.Router();

//Post requiest for new checkout

route.post("/",protect,async (req, res) => {
    const {checkoutItems, shippingAddress, paymentMethod, totalPrice} = req.body

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(404).status({message : "no Items in checkout"})
    };

    try{
        const newCheckout = await Checkout.create({
            user : req.user._id,
            checkoutItems : checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus : "Pending",
            isPaid : false
        });

        return res.status(200).json(newCheckout)
    }catch(err){
        console.error(err);

        return res.status(500).json({message : `Server error: ${err}`})
    }
})

//route for updating checkout

route.put("/:id/pay",protect,async (req, res) => {
    const {paymentStatus, paymentDetails} = req.body;

    try{
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({message : "chcekout not found"})
        }

        if(paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails  = paymentDetails;
            checkout.paidAt = Date.now();

            await checkout.save();

            return res.status(200).json(checkout)
        }else{
            return res.status(400).json({message : "Invalid Payment Status"})
        }
    }catch(err){
        console.error(err)
        return res.status(500).json({message : ` Server Error: ${err}`})
    }
})

// post requist for create new order

route.post("/:id/finalize",protect, async (req, res) => {
    try{
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({ message : "Checkout not found"})
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder= await Order.create({
                user : checkout.user,
                orderItems : checkout.checkoutItems,
                shippingAddress : checkout.shippingAddress,
                paymentMethod : checkout.paymentMethod,
                totalPrice : checkout.totalPrice,
                isPaid : true,
                paidAt : checkout.paidAt,
                isDelivered : false,
                paymentStatus : "paid",
                paymentDetails : checkout.paymentDetails
            });

            checkout.isFinalized = true,
            checkout.finalizedAt = Date.now()
            await checkout.save();

            await Cart.findOneAndDelete({user : checkout.user});
            return res.status(200).json(finalOrder)
        }else if(checkout.isFinalized) {
            return res.status(400).json({message : "Checkout alredy finalized"})
        }else{
            return res.status(400).json({message : "Checkout is Not Paid"})
        }
    }catch(err){
        console.error(err)
        return res.status(500).json({message : `Server Error ;  ${err}`})
    }
});

module.exports = {
    checkoutRoute: route
}