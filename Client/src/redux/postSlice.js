import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState:{
        posts:null,
        refresh: false,
    },
    reducers:{
        getAllPosts:(state, action)=>{
            state.posts = action.payload
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh;
        }
    }
})

export const {getAllPosts, getRefresh} = postSlice.actions;
export default postSlice.reducer;