import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const USER_TOKEN = `Bearer ${localStorage.getItem("token")}`;

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProduct/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/products`, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });

      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//asyn function to create new product
export const createAdminProduct = createAsyncThunk(
  "adminProducts/createAdminProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/products`,
        productData,
        {
          headers: {
            Authorization: USER_TOKEN,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//async thunk to update admin product
export const updateAdminProduct = createAsyncThunk(
  "adminProduct/updateAdminProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: USER_TOKEN,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//asyn thunk to delete admin product
export const deleteAdminProduct = createAsyncThunk(
  "adminProducts/deleteAdminProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/products/${productId}`,
        {
          headers: {
            Authorization: USER_TOKEN,
          },
        }
      );

      return productId;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//Admin product slice
const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reeducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            //create admi products
            .addCase(createAdminProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            //update products
            .addCase(updateAdminProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload
                const index = state.products.findIndex((product) => product._id === updatedProduct._id)
                if(index !== -1) {
                    state.products[index] = updatedProduct
                }          
            })
            .addCase(updateAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            //delete Admin Product
            .addCase(deleteAdminProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((products) => products._id !== action.payload)
            })
            .addCase(deleteAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export default adminProductSlice;
