const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors");
const { connectingDB } = require("./config/db");
const route = require('./routes/userRoutes');
const {productRoute} = require("./routes/productRoutes");
const {cartRoute} = require("./routes/cartRoutes");
const { checkoutRoute} = require("./routes/checkoutRoutes");
const { orderRoute} = require("./routes/orderRoutes");
const {uploadRoute} = require("./routes/uploadRoute");
const {subscribeRoute} = require("./routes/subscriberRoute");
const {adminRoute} = require("./routes/adminRoutes");
const {productAdminRoute} = require("./routes/productAdminRoutes");
const { adminOrderRoute} = require("./routes/adminOrderRoutes");

 
dotenv.config();
const app = express();
const PORT = process.env.PORT ||  8000;


app.use(express.json());
app.use(cors());

connectingDB()

app.get("/",(req,res) => {
    return res.send("The starting of backend")
})

//API routes
app.use("/api/products",productRoute)
app.use("/api/users",route);
app.use("/api/cart",cartRoute);
app.use("/api/checkout",checkoutRoute);
app.use("/api/order",orderRoute);
app.use("/api/upload",uploadRoute);
app.use("/api",subscribeRoute);

//Admin routes
app.use("/api/admin/users",adminRoute);
app.use("/api/admin/products",productAdminRoute);
app.use('/api/admin/orders',adminOrderRoute)


app.listen(PORT,() => {
    return console.log(`!!----app is listening on PORT ${PORT}----!!`)
})