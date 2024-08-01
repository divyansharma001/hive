import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:null,
        otherUsers: null,
        profile: null,
    },
    reducers:{
        getUser: (state, action)=>{
            state.user = action.payload
        },
        getOtherUsers: (state, action)=>{
            state.otherUsers = action.payload;
        },
        getMyProfile: (state, action)=>{
            state.profile = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload;
          },
          clearUser: (state) => {
            state.user = null;
          },
    }
})

export const {getUser, getOtherUsers, getMyProfile, setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;