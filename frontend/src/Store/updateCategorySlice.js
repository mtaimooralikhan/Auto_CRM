import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const updateCategorySlice = createAsyncThunk(
    'update',
    async(name) => {
        const token = localStorage.getItem('token');
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        const request = await axios.patch(`http://localhost:5000/categories/${name._id}`,name, {headers});
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const updateCategory = createSlice({
  name: "update",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(updateCategorySlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(updateCategorySlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(updateCategorySlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default updateCategory.reducer;
