import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

//create Async thunk for fetchng products by filter

export const fetchProductsByFIlters = createAsyncThunk(
  "products/fetchByFilters",
  async (
    {
      collection,
      category,
      size,
      color,
      minPrice,
      maxPrice,
      sortBy,
      search,
      material,
      brand,
      limit,
      gender
    },
    thunkAPI
  ) => {
    try {
      const searchParam = new URLSearchParams();

      if (collection) searchParam.append("collection", collection);
      if (category) searchParam.append("category", category);
      if (size) searchParam.append("size", size);
      if (color) searchParam.append("color", color);
      if (minPrice) searchParam.append("minPrice", minPrice);
      if (maxPrice) searchParam.append("maxPrice", maxPrice);
      if (sortBy) searchParam.append("sortBy", sortBy);
      if (search) searchParam.append("search", search);
      if (material) searchParam.append("material", material);
      if (brand) searchParam.append("brand", brand);
      if (limit) searchParam.append("limit", limit);
      if (gender) searchParam.append("gender", gender);

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/products?${searchParam.toString()}`
      );
      
      return response.data.product;
    } catch (err) {
      {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

//async thunk for fetch single product by id

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, thunkApi) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      
      return [response.data];
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

//async thunk to update product data
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/peoducts/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  }
);


//async thunk to fetch similar products 
export const fetchSimilarProducts = createAsyncThunk("products/sismilarProducts", async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);

    return response.data
})

//async thunk to fetch best seller product
export const bestSellerProduct = createAsyncThunk("products/bestSellerProduct", async (_, {rejectWithValue}) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
    
    return response.data
  }catch(err){
    console.error(err)
    return rejectWithValue(err.response.message);
  }
})

//creating product slice

//create product slice

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products : [],
        selectedProduct: null,
        similarProducts: [],
        bestSeller: null,
        loading: false,
        error: null,
        filters: {
            collection : "",
            category : "",
            size : "",
            color : "",
            minPrice : "",
            maxPrice : "",
            sortBy : "",
            search : "",
            material : "",
            brand : "",
            limit : "",
            gender:  ""
        }
    },
    reducers: {
        setFilters: (state, action) =>  {
            state.filters = {...state.filters, ...action.payload}
        },
        clearFilters: (state) =>  {
            state.filters = {
                collection : "",
                category : "",
                size : "",
                color : "",
                minPrice : "",
                maxPrice : "",
                sortBy : "",
                search : "",
                material : "",
                brand : "",
                limit : "",
            }
        }
    },
    extraReducers:  (builder) => {
        builder
            //extrareducer for get product
            .addCase(fetchProductsByFIlters.pending,(state) => {
                state.loading = true,
                state.error = false
            })
            .addCase(fetchProductsByFIlters.fulfilled,(state, action) => {
                state.loading = false,
                state.products = Array.isArray(action.payload)? action.payload:[];
            })
            .addCase(fetchProductsByFIlters.rejected,(state, action) => {
                state.loading = false,
                state.error = action.error.message
            })
            //extrareducer for fetch product details
            .addCase(fetchProductDetails.pending,(state) => {
                state.loading = true,
                state.error = false
            })
            .addCase(fetchProductDetails.fulfilled,(state, action) => {
                state.loading = false,
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetails.rejected,(state, action) => {
                state.loading = false,
                state.error = action.error.message
            })
            //handle update products
            .addCase(updateProduct.pending,(state) => {
                state.loading = true,
                state.error = false
            })
            .addCase(updateProduct.fulfilled,(state, action) => {
                state.loading = false
                const updatedProduct = action.payload;
                const index = state.products.findIndex((product) => product._id === updateProduct._id);

                if(index !== -1)  {
                    state.products[index] = updatedProduct
                }        
            })
            .addCase(updateProduct.rejected,(state, action) => {
                state.loading = false,
                state.error = action.error.message
            })
            // for fecth similar product
            .addCase(fetchSimilarProducts.pending,(state) => {
                state.loading = true,
                state.error = false
            })
            .addCase(fetchSimilarProducts.fulfilled,(state, action) => {
                state.loading = false,
                state.similarProducts = Array.isArray(action.payload)? action.payload:[]
            })
            .addCase(fetchSimilarProducts.rejected,(state, action) => {
                state.loading = false,
                state.error = action.error.message
            })
            //for best-seller
            .addCase(bestSellerProduct.pending,(state) => {
                state.loading = true,
                state.error = false
            })
            .addCase(bestSellerProduct.fulfilled,(state, action) => {
                state.loading = false,
                state.bestSeller = action.payload;
            })
            .addCase(bestSellerProduct.rejected,(state, action) => {
                state.loading = false,
                state.error = action.error.message
            })
    }
});

export const productSliceaction = productSlice.actions;
export default productSlice