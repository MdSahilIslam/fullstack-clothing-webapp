import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const userFromLocalStorage = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null;

const initialGuestId = localStorage.getItem("guestId") || `guset_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

const initialState = {
    user : userFromLocalStorage,
    guestId : initialGuestId,
    loading : false,
    error : null
}

//createing async thunk for login user

export const loginUser = createAsyncThunk("user/loginUser", async (userData, thunkApi) => {
    
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData);

        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("token",response.data.token);

        return response.data.user
    }catch(err){
        return thunkApi.rejectWithValue(err.response.data)
    }
})

//createing async thunk for register user
export const registerUser = createAsyncThunk("user/registerUser", async (userData, thunkApi) => {

    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData);
    
        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("token",response.data.token);

        return response.data.user
    }catch(err){
        return thunkApi.rejectWithValue(err.response.data)
    }
})

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        logout : (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
            localStorage.setItem("guestId",state.guestId)
        },
        generateNewGuestId : (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId",state.guestId)
        }
    },
    extraReducers : (builder) => {
        builder.
            addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = false
            }).
            addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user= action.payload
            }).
            addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            }).
            addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = false
            }).
            addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            }).
            addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            })
    }
}); 

export const authAction  = authSlice.actions;
export default authSlice