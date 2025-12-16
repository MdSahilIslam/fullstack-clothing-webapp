import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//async thunk to fetch data for orders
export const fetchOrders = createAsyncThunk("order/fetchOrders", async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/my-orders`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//async thunk to fetch order details by its id
export const fetchOrderDetails = createAsyncThunk("order/fetchOrderDetails", async(orderId, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    }catch(err){
        console.error(err);
        return rejectWithValue(err.response.data)
    }
});

const orderSlice = createSlice({
    name : "oredrs",
    initialState: {
        orders : [],
        totalOrders:0,
        orderDetails : null,
        loading : false,
        error : null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch user orders
            .addCase(fetchOrders.pending,(state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(fetchOrders.fulfilled,(state, action) => {
                state.loading = false,
                state.orders = action.payload
            })
            .addCase(fetchOrders.rejected,(state, action) => {
                state.loading = false,
                state.error = action.payload.message
            })
            //fetch order deatils
            .addCase(fetchOrderDetails.pending,(state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(fetchOrderDetails.fulfilled,(state, action) => {
                state.loading = false,
                state.orderDetails = action.payload
            })
            .addCase(fetchOrderDetails.rejected,(state, action) => {
                state.loading = false,
                state.error = action.payload.message
            }) 
    }
})

export default orderSlice