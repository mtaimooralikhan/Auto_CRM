import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createCarSlice = createAsyncThunk(
    'car',
    async(cars) => {
        const token = localStorage.getItem('token');
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        const request = await axios.post('http://localhost:5000/cars', cars, {headers});
        const response = await request.data;
        return response;
    }
);

const createCar = createSlice({
  name: "car",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(createCarSlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(createCarSlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(createCarSlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default createCar.reducer;