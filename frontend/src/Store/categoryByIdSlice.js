import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const categoryByIdSlice = createAsyncThunk(
    'categoryById',
    async(_id) => {
        debugger
        const token = localStorage.getItem('token');
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        const request = await axios.get(`http://localhost:5000/categories/${_id}`, {headers});
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const categoryByIdDataSlice = createSlice({
  name: "categoryById",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(categoryByIdSlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(categoryByIdSlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(categoryByIdSlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default categoryByIdDataSlice.reducer;