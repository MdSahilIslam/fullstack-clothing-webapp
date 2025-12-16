const express = require("express");
const Product = require("../models/product");
const {protect, admin} = require("../middlewares/authMiddleware");


const route = express.Router();

route.post("/",protect,admin,async (req,res) => {
    try{
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimension,
            weight,
            sku
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimension,
            weight,
            sku,
            user : req.user._id
        });

        return res.status(201).json(product)
        

    }catch(err) {
        return res.status(500).json({msg : `server Error: ${err}`})
    }
});

route.put("/:id",protect,admin,async (req,res) => {
    try{
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimension,
            weight,
            sku
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice|| product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimension = dimension || product.dimension 
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;
            
            const updatedProduct = await product.save();
            
            return res.status(202).json({msg: "Product Updated successsfully",
                updatedProduct
            })

        } else {
            return res.status(403).json({msg : "Product not found"})
        }
    } catch(err) {
        return res.status(500).json({msg: `Server error: ${err}`})
    }
})

route.delete("/:id",protect,admin,async (req , res) => {
    
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            const deletedProduct = await product.deleteOne({_id:req.params.id});
            return res.status(200).json({msg  : "Product deleted successfully",
                deletedProduct
            })
        }else{
            return res.status(404).json({msg:"Product didn't found"})
        }
    }catch(err) {
        return res.status(500).json({msg:`Server Error: ${err}`})
    }
});

route.get("/", async (req, res) => {
    try{
        const {collection, category, size, color, gender, minPrice, maxPrice, sortBy, search, material, brand, limit} = req.query

        let query = {}

        if(collection && collection.toLocaleLowerCase() !== "all") {
            query.collection = collection;
        };

        if(category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        };

        if(size) {
            query.sizes = {$in : size.split(",")};
        };


        if(material) {
            query.material = {$in : material.split(",")};
        };
        
        if(brand) {
            query.brand = {$in : brand.split(",")};
        };

        if(color) {
            query.colors = {$in : [color]};
        };

        if(gender) {
            query.gender = gender;
        };

        if(search) {
            query.$or = [
                {name : {$regex : search, $options : "i"}},
                {description :  {$regex : search, $options: "i"}}
            ];
        };

        if(minPrice || maxPrice) {
            query.price = {}
            if(minPrice) {
                query.price.$gte = Number(minPrice)
            }

            if(maxPrice) {
                query.price.$lte = Number(maxPrice)
            }         
        }

        let sort;
        if (sortBy) {
            switch(sortBy){
            case ("priceAsc"):
                sort = {price: 1};
                break;
            case ("priceDsc"):
                sort = {price : -1};
                break
            case ("popularity"):
                sort = {rating : -1};
                break;
            default:
                break;
            }
        }
        const product = await Product.find(query).sort(sort).limit(Number(limit) || 0);

        return res.status(200).json({ product })

    }catch(err){
        return res.status(500).json({msg: `Server Error: ${err}`})
    }
})

route.get("/best-seller",async (req, res) => {
    try{
        const product = await Product.findOne().sort({rating : -1, numReviews: -1})

        if(product) {
            return res.json(product);
        }else{
            return res.status(404).json({msg : "Best-seller not found"})
        }

    }catch(err){
        return res.status(500).json({msg : `Server Error ${err}`})
    }
})

route.get("/new-arrival", async (req, res) =>  {
    try{
        const newArrival = await Product.find().sort({createdAt : -1}).limit(8);

        if(newArrival) {
            return res.json(newArrival);
        }else{
            return res.status(404).json({msg : "Product not found"});
        }
    }catch(err){
        return res.status(500).json({msg : `Server Error: ${err}`})
    }
})

route.get("/:id",async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            return res.json(product);
        }else{
            return res.status(404).json({msg:"Product not found"})
        }
    }catch(err){
        return res.status(500).json({msg : `Server error: ${err}`})
    }
})

route.get("/similar/:id",async (req,res) => {
    try{
        // const {_id} = req.params.id
        const product = await Product.find({_id: req.params.id},{category:1,gender:1});

        if(!product) {
            return res.status(404).json({msg : "Product not found"})
        };

        const similarProducts = await Product.find({
            _id : {$ne : product[0]._id},
            gender : product[0].gender,
            category : product[0].category
        }).sort({rating: -1}).limit(4)
        
        return res.json(similarProducts)
    }catch(err) {
        console.error(err)
        return res.status(500).json({msg : `Server Error: ${err}`})
    }
})
module.exports = {
    productRoute : route
}
