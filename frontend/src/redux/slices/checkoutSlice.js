import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//async thunk to make new checkout session
export const creatCheckout = createAsyncThunk("checkout/createCheckout", async (checkoutData, {isRejectedWithValue}) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`,checkoutData,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        return response.data
    }catch(err){
        console.error(err)
        return isRejectedWithValue(err.response.data)
    }
});

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading : false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.
            addCase(creatCheckout.pending,(state) => {
                state.loading = true,
                state.error = null
            }).
            addCase(creatCheckout.fulfilled,(state,action) => {
                state.loading = false,
                state.checkout = action.payload
            }).
            addCase(creatCheckout.rejected,(state, action) => {
                state.loading = false,
                state.error = action.payload?.message
            })
    }
});

export default checkoutSlice