const mongoose = require("mongoose");

const connectingDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("!-!-Connected to Data Base-!-!")
        
    } catch (err){
            console.error("Failed to Connect DB:",err);
            process.exit(1)
    }
}

module.exports = {
    connectingDB
}