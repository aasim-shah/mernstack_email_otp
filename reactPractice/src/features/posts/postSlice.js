import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

const initialState = {
    status : 'idle',
    msg : "",
    posts : []
}

export const getAllData = createAsyncThunk('posts' , async()=>{
    try {
        const {data} = await authService.getPrivateData()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        
    }
})

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {

    },
    extraReducers : (builder) =>{
        builder.addCase(getAllData.pending , (state , action) =>{
            console.log(action)
            state.status="LOADING"
        }),
        builder.addCase(getAllData.fulfilled , (state , action) =>{
            state.status="DONE"
            console.log(action)
        })
    }
})


export const {} = postSlice.actions
export default postSlice.reducer