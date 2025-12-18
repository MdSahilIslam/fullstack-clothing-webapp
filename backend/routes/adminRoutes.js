const express = require("express");
const User = require("../models/user");
const {protect, admin} = require("../middlewares/authMiddleware");

const route = express.Router()
//get request for getting all users

route.get("/", protect, admin, async (req, res) => {
    try{
        const users = await User.find({});
        if(users.length === 0) {
            return res.json({message : "No user found!!"})
        }

        return res.json(users)
    }catch(err){
        console.error(err);
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})


//post route for creating new user

route.post("/", protect, admin, async (req, res) => {
    const {name, email, password, role} = req.body
    try{
        let user = await User.findOne({email});

        if(user) {
            return res.json({message : "Email alredy exists"});
        }
        user = new User({
            name,
            email,
            password,
            role : role  || "customer"
        })

        await user.save();

        return res.status(201).json(user)
    }catch(err){
        console.error(err)
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})


//Put route for updating user data

route.put("/:id", protect, admin, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if(user) {
            user.name = req.body.name || user.name,
            user.email = req.body.email || user.email,
            user.role = req.body.role || user.role

            await user.save();
            return res.status(200).json(user)
        }else{
            return res.status(404).json({message : "User not found"})
        } 
    }catch(err){
        console.error(err)
        return res.status(500).json({message : `Server Error: ${err}`})
    }
});


//request fto delete any user from db

route.delete("/:id", protect, admin, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({message : "User not found"})
        }

        await User.deleteOne({_id : req.params.id});
        return res.status(200).json({message : "User deleted successfully"})
    }catch(err){
        return res.status(500).json({message : `Server Error: ${err}`})
    }
})


module.exports = {
    adminRoute : route,
}