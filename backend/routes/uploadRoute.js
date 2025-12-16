const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const streamifier =require("streamifier");
const fs = require("fs")
const cloudinary = require("cloudinary").v2

dotenv.config();
const route = express.Router();

//configuring cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    
})

//multer setup
const storage = multer.memoryStorage();
const upload = multer({storage});

route.post("/",upload.single("image"),async (req, res) => {
    try{
        if(!req.file) {
            return res.status(404).json({msg : "No file uploaded!!"})
        }
        //function to upload the stream into cloudinary
        const streamUpload = (fileBuffer) => {
            
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    transformation:[
                        {width: 2000, height:2400, crop:"fill", gravity: "auto"}
                    ]
                },(error, result) => {
                    if (result) {
                        resolve(result)
                    }else{
                        reject(error)
                    }
                })

                // making stream using streamifier
                streamifier.createReadStream(fileBuffer).pipe(stream);
                // fs.createReadStream(fileBuffer,"utf-8").pipe(stream)
            })
        };

        const result = await streamUpload(req.file.buffer);

        return res.json({imageUrl : result.secure_url})
    }catch(err){
        console.error(err);
        return res.status(500).json({msg : `Internal server error: ${err}`})
    }
})

module.exports = {
    uploadRoute : route
}