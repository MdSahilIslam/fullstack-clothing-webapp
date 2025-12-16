const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const tokenData = jwt.verify(token,process.env.SECRET_KEY);

            const user = await User.findById(tokenData.user._id).select("-password")
            req.user = user

            next()
        }catch(err) {
            return res.status(401).json({msg: "Not authorized, token failed", error : err})
        }
    } else {
        return res.status(401).json({msg: "Not authorized, no token provided"});
    }
}

//check middle ware user admin or not

const admin = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next()
    } else {
        return res.status(403).json({msg : "USer not authorized as admin"})
    }
}

module.exports = {
    protect,
    admin
}