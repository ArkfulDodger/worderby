// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface BalanceState {
  value: number;
}

// This is the initial state of the slice
const initialState: BalanceState = {
  value: 0,
};

export const balanceSlice = createSlice({
  name: "balance", // This is the name of the slice, we will later use this name to access the slice from the store
  initialState, // This is the initial state of the slice
  reducers: {
    // All the reducers go here
    deposit: (state, action: PayloadAction<number>) => {
      // This is the reducer function for the deposit action
      state.value += action.payload;
    },
    withdraw: (state, action: PayloadAction<number>) => {
      // This is the reducer function for the withdraw action
      state.value -= action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deposit, withdraw } = balanceSlice.actions;

// We export the reducer function so that it can be added to the store
export default balanceSlice.reducer;
