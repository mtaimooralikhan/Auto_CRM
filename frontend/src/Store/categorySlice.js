import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const categorySlice = createAsyncThunk(
    'categorySlice',
    async() => {
        const token = localStorage.getItem('token');
        const request = axios.get('http://localhost:5000/categories', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          return request;
    }
);

const categoryDataSlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(categorySlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(categorySlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(categorySlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default categoryDataSlice.reducer;