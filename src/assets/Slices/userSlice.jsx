import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "./axiosHelper";

export const saveUser = createAsyncThunk(
    "user/saveUser",
    async (userData, thunkAPI) => {
        try {
            const res = await httpClient.post("/user/addUser", userData);
            console.log("User saved successfully:", res.data);
            return res.data; // success
        } catch (error) {
            return null;// failure
        }
    }
);

export const updateride = createAsyncThunk(
    "user/updateride",
    async (ride) => {
        try {
           await httpClient.put("/updateride", ride);
        } catch (error) {
            console.log(error);
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/login",
    async (userData, thunkAPI) =>{
        try {
            const res = await httpClient.post("/user/loginUser", userData);
            console.log("User logged in successfully:", res.data);
            return res.data; //success
        } catch (error) {
            return null; // failure
        }
    }
)

export const deleteride = createAsyncThunk(
    "user/deleteride",
    async(rId, thunkAPI)=>{
        try {
            await httpClient.delete("/deleteride",rId);
        } catch (error) {
            console.log(error)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {user:{},rider:{}},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setRider: (state, action) => {
            state.rider = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.fulfilled,(state,action)=>{
                if(action.payload.role == 'passenger'){
                    state.user = action.payload;
                } else {
                    state.rider = action.payload;
                }
            })
            .addCase(saveUser.rejected,(state)=>{
                state.user = {};
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                if(action.payload.role == 'passenger'){
                    state.user = action.payload;
                } else {
                    state.rider = action.payload;
                }
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.user = {};
            })
            .addCase(updateride.fulfilled, (state, action)=>{
            })
            .addCase(deleteride.fulfilled,(state,action)=>{
            })
    }
});

export const { setUser, setRider } = userSlice.actions;

export default userSlice.reducer;