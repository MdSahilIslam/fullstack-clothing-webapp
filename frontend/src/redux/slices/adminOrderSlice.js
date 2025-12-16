import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const USER_TOKEN = `Bearer ${localStorage.getItem("token")}`;


//fetch all orders (admin)
export const fetchAllAdminOrders = createAsyncThunk("adminOrders/fetchAllAdminOrders", async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/orders`,{
            headers: {
                Authorization: USER_TOKEN
            }
        })

        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//update order status (admin)
export const updateOrderStatus = createAsyncThunk("adminOrdfer/updateOrderStatus", async ({id, status},{rejectWithValue}) => {
    try{
        const response = await axios.put(`${BACKEND_URL}/api/admin/orders/${id}`,{status},{
            headers: {
                Authorization: USER_TOKEN
            }
        });

        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//delete order
export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder", async (id, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${BACKEND_URL}/api/admin/orders/${id}`,{
            headers:{
                Authorization: USER_TOKEN
            }
        });

        return id
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//creatre admin Order Slice
const adminOrderSlice = createSlice({
    name:  "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch all orders
            .addCase(fetchAllAdminOrders.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchAllAdminOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
                //calculating total sales
                const totalSales = action.payload.reduce((acc, order) => {
                    return acc + order.totalPrice
                },0);
                state.totalSales = totalSales;
            })
            .addCase(fetchAllAdminOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            })
            //update order
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex((order) => order._id === action.payload._id);
                if(index !== -1) {
                    state.orders[index] = action.payload
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            })
            //delete order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter((order) => order._id !== action.payload)
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            })
    }
})

export default adminOrderSlice