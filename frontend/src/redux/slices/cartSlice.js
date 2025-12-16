import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//helperr function to load cart from local storage
const loadCartFromLocalStorage = () =>  {
    const storedCart = localStorage.getItem("cart");
    return storedCart? JSON.parse(storedCart): {products:[]}
}

//Helper function for saving cart to localStorage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart",JSON.stringify(cart));
}

//ASYNC THUNK FOR FETCHING Cart
export const fetchCart = createAsyncThunk("cart/fetchCart",async ({userId, guestId}, {rejectWithValue}) =>  {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            params: {userId, guestId}
        });

        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//async thunk to add product in cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({productId, quantity, size, color, guestId, user},{rejectWithValue})=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{productId, quantity, size, color, guestId, user});
        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
});

//async thunk to update cart item qunatity
export const updateCartItmQty = createAsyncThunk("cart/updateCartItmQty", async ({guestId, user, color, size, quantity, productId},{rejectWithValue}) => {
    try{
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{guestId, user, color, size, quantity, productId});

        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//async thunk for removing item from cart
export const deleteItemFromCart = createAsyncThunk("cart/deleteItemFromCart", async ({productId, guestId, user, color, size}, {rejectWithValue}) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data:{productId, guestId, user, color, size},
        })

        return response.data
    }catch(err){
        console.lerror(err);
        return rejectWithValue(err.response.data)
    }
})

//async thunk to merge guest cart to user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async({guestId, user}, {rejectWithValue}) => {
    try{
        const response = await  axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{guestId},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data
    }catch(err){
        console.lerror(err)
        return rejectWithValue(err.response.data)
    }
})

//create cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cart: loadCartFromLocalStorage(),
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = {products:[]};
            localStorage.removeItem("cart")
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).
            addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            }).
            addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            }).
            addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).
            addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            }).
            addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add to cart";
            }).
            addCase(updateCartItmQty.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).
            addCase(updateCartItmQty.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            }).
            addCase(updateCartItmQty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity";
            }).
            addCase(deleteItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).
            addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            }).
            addCase(deleteItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item from cart";
            }).
            addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).
            addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            }).
            addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            })
    }
});

export const cartSliceActions = cartSlice.actions
export default cartSlice