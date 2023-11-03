// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColorSchemeName } from "react-native";

// Define a type for the slice state
interface ThemeState {
  systemTheme: ColorSchemeName;
  isDark: boolean;
}

// This is the initial state of the slice
const initialState: ThemeState = {
  systemTheme: "light", // alternative is "dark"
  isDark: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setSystemTheme: (state, action: PayloadAction<ColorSchemeName>) => {
      state.systemTheme = action.payload;
    },
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
export const { setSystemTheme, toggleDarkMode, setDarkModeOn, setDarkModeOff } =
  themeSlice.actions;

// We export the reducer function so that it can be added to the store
export default themeSlice.reducer;
