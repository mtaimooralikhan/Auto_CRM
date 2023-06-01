import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const updateCarSlice = createAsyncThunk(
    'updateCar',
    async(cars) => {
        const token = localStorage.getItem('token');
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        const request = await axios.patch(`http://localhost:5000/cars/${cars._id}`,cars, {headers});
        console.log("Request", request);
        const response = await request.data;
        console.log("Response", response);
        return response;
    }
);

const updateCar = createSlice({
  name: "updateCar",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(updateCarSlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(updateCarSlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(updateCarSlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default updateCar.reducer;
