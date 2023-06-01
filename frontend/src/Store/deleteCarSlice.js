import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const deleteCarSlice = createAsyncThunk(
    'delete',
    async(name) => {
        let deleteCar = {
            _id: name
          }
        const token = localStorage.getItem('token');
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        const request = await axios.delete(`http://localhost:5000/cars/${deleteCar._id}`, {headers});
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const deleteCar = createSlice({
  name: "delete",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(deleteCarSlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(deleteCarSlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(deleteCarSlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default deleteCar.reducer;
