import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createCategorySlice = createAsyncThunk(
    'carCategory',
    async(name) => {
        const token = localStorage.getItem('token');
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        const request = await axios.post('http://localhost:5000/categories', name, {headers});
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const createCategory = createSlice({
  name: "category",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(createCategorySlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(createCategorySlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(createCategorySlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default createCategory.reducer;
