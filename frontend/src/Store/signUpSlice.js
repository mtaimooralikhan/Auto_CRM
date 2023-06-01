import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const signUpUser = createAsyncThunk(
    'signUpUser',
    async(signUpUser) => {
        const request = await axios.post('http://localhost:5000/users/signup', signUpUser);
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(signUpUser.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(signUpUser.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(signUpUser.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default signUpSlice.reducer;