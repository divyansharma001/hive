import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState:{
        posts:null
    },
    reducers:{
        getAllPosts:(state, action)=>{
            state.posts = action.payload
        }
    }
})

export const {getAllPosts} = postSlice.actions;
export default postSlice.reducer;