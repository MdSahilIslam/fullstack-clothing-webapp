import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { Axios } from "axios"

//async thunk fetch all suers 
export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async (_ , {rejectWithValue}) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//create user
export const createUser = createAsyncThunk("admin/createUser", async (userData, {rejectWithValue}) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,userData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})

//update User
export const updateUser = createAsyncThunk("admin/updateUser", async ({id, name, email, role}, {rejectWithValue}) => {
    try{
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,{id, name, email, role},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data
    }catch(err){
        console.erro(err)
        return rejectWithValue(err.response.data)
    }
});

//delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        return userId
    }catch(err){
        console.error(err)
        return rejectWithValue(err.response.data)
    }
})


//create admin slice

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users:  [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
             .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user._id === action.payload._id)
                if(index !== -1) {
                    state.users[index] = action.payload
                }  
                   
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })   
    }
    }
)

export default adminSlice