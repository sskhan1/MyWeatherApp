import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiKey } from "../../config/ApiKey";
import axios from "axios";

export const getWeather = createAsyncThunk(
 "weather/getWeather",
 async (city) => {
  try {
   const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}`;
   const response = await axios.get(apiUrl);

   if (response.status === 400) {
    throw new Error("City not found");
   }

   return response.data;
  } catch (error) {
   console.log(error);
   throw error;
  }
 }
);

const weatherSlice = createSlice({
 name: 'weather',
 initialState: {
  data: null,
  loading: false,
  error: null,
  searchHistory: [],
 },
 reducers: {
  addToSearchHistory(state, action) {
   state.searchHistory.unshift(action.payload);
  },
  clearSearchHistory(state) {
   state.searchHistory = [];
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(getWeather.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getWeather.fulfilled, (state, action) => {
    state.data = action.payload;
    state.loading = false;
    state.error = null;
   })
   .addCase(getWeather.rejected, (state, action) => {
    state.data = null;
    state.loading = false;
    state.error = action.error.message;
   });
 },
});

export const { addToSearchHistory, clearSearchHistory } = weatherSlice.actions;

export default weatherSlice.reducer;