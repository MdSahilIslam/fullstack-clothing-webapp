const express = require("express");
const Product = require("../models/product");
const {protect, admin} = require("../middlewares/authMiddleware");

const route = express.Router();

//to get all products for admin
route.get("/", protect, admin, async (req, res) => {
    try{
        const products = await Product.find({});

        if(products.length === 0) {
            return res.status(404).json({message : "Product not found"})
        }

        return res.status(200).json(products)
    }catch(err){
        console.error(err);
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})

module.exports = {
    productAdminRoute : route
}