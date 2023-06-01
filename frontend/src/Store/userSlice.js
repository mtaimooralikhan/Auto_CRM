import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
    'loginUser',
    async(userLogin) => {
        const request = await axios.post('http://localhost:5000/users/login', userLogin);
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const userSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(loginUser.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(loginUser.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(loginUser.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default userSlice.reducer;
