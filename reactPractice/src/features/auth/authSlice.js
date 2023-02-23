import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = "http://localhost:5000/"
const preUser = JSON.parse(localStorage.getItem('user'))

export const register = createAsyncThunk('register', async ({ fullName, email, password }) => {
     const response = await axios.post(API_URL + "register", { fullName, email, password })
       if(response.data.token){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
})

export const login = createAsyncThunk('login', async({email , password})=>{
    const {data} = await axios.post(API_URL + 'login' , { email ,password})
    console.log(data)
    if(data.token){
        localStorage.setItem('user' , JSON.stringify(data))
    }
    return data;
})




export const authSlice = createSlice({
    name: "auth",
    initialState: preUser ? {
        isLoggedin: true,
        status: "idle",
        msg : "",
        user: preUser.token
    }: {isLoggedin: false,
        status: "idle",
        msg: "",
        user: {}},
    reducers:  {
        logout : (state, action)=>{
            state.isLoggedin = false;
            localStorage.removeItem('user')
            console.log('loggout out reducer')
            state.user={}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.status = "LOADING"
        }),
        builder.addCase(register.fulfilled, (state, action) => {
            state.status = "DONE"
            state.msg=action.payload.msg
            if(action.payload.token){
                state.user = action.payload.token
                state.isLoggedin = true;
            }
        }),
        builder.addCase(register.rejected, (state, action) => {
            state.msg=action.payload.msg;
            state.status = "DONE"
        }),
        builder.addCase(login.pending, (state, action) => {
            state.status = "LOADING"
        }),
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = "DONE"
            state.msg=action.payload.msg
            if(action.payload.token){
                state.user = action.payload.token
                state.isLoggedin = true;
            }
        })
    }
})


export const { logout } = authSlice.actions
export default authSlice.reducer