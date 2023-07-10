// Import the createSlice API from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ThemeState {
  isDark: boolean;
}

// This is the initial state of the slice
const initialState: ThemeState = {
  isDark: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
    setDarkModeOn: (state) => {
      state.isDark = true;
    },
    setDarkModeOff: (state) => {
      state.isDark = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode, setDarkModeOn, setDarkModeOff } =
  themeSlice.actions;

// We export the reducer function so that it can be added to the store
export default themeSlice.reducer;
