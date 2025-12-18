const express = require('express');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {protect} = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/register",async (req,res) => {

    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});
        await user.save();
        
        const payload = {user: {
            _id:user._id,
            role : user.role
        }};
        jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: "20h"},(err, token) => {
            if (err) throw err;

            return res.status(201).json({user:{
                id:user._id,
                name  : user.name,
                email : user.email,
                role : user.role,
                
            },
            token:token})
        })
    }catch(err) {
        res.status(500).send({message: `Server err:${err}`})
    }
})

route.post("/login",async (req,res) => {

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        //finding user by Email
        if (!user) {
            return res.status(400).json({message : "Invalid Credential!!"});
        }

        //macthing password
        const matchingPassword = await user.matchPassword(password);

        if (!matchingPassword) {
            return res.status(400).json({message : "Invalid Creadentilas!"})
        }

        //making jwt token
        const payload = {user: {
            _id:user._id,
            role : user.role
        }};
        jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: "20h"},(err, token) => {
            if (err) throw err;

            return res.json({user:{
                id:user._id,
                name  : user.name,
                email : user.email,
                role : user.role,
                
            },
            message:"Login successful",
            token:token})
        })


    } catch(err) {
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})

route.get("/profile",protect,(req, res) => {
    return res.status(200).json(req.user)
})

module.exports = route