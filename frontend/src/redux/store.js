import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderSlice from "./slices/orderSlice";
import adminSlice from "./slices/adminSlice";
import adminProductSlice from "./slices/adminProductSlice";
import adminOrderSlice from "./slices/adminOrderSlice";

const cosmosStore = configureStore({
    reducer :  {
        auth: authSlice.reducer,
        products: productSlice.reducer,
        cart : cartSlice.reducer,
        checkout: checkoutSlice.reducer,
        orders: orderSlice.reducer,
        admin: adminSlice.reducer,
        adminProduct: adminProductSlice.reducer,
        adminOrders:  adminOrderSlice.reducer,
    }
});

export default cosmosStore