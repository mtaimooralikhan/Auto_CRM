import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const deleteCategorySlice = createAsyncThunk(
    'delete',
    async(name) => {
        let deleteCategory = {
            _id: name
          }
        const token = localStorage.getItem('token');
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        const request = await axios.delete(`http://localhost:5000/categories/${deleteCategory._id}`, {headers});
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const deleteCategory = createSlice({
  name: "delete",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(deleteCategorySlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(deleteCategorySlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(deleteCategorySlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default deleteCategory.reducer;
