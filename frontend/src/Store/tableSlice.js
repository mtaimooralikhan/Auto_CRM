import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const tableSlice = createAsyncThunk(
    'tableSlice',
    async() => {
        const token = localStorage.getItem('token');
        const request = axios.get('http://localhost:5000/cars', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          return request;
    }
);

const tableDataSlice = createSlice({
  name: "table",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
extraReducers: (builder) => {
    builder
    
    .addCase(tableSlice.pending, (state)=> {
        state.loading = true;
        state.user = null;
        state.error =null;
    })
    .addCase(tableSlice.fulfilled, (state, action)=> {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
    })
    .addCase(tableSlice.rejected, (state, action)=> {
        state.loading = true;
        state.user = null;
        console.log(action.error.message);
        state.error =null;
    })

}

});


export default tableDataSlice.reducer;