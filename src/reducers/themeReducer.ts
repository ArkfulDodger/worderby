// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColorSchemeName } from "react-native";

// Define a type for the slice state
interface ThemeState {
  isDark: boolean;
  systemTheme: ColorSchemeName;
  themePreference?: ColorSchemeName;
}

// This is the initial state of the slice
const initialState: ThemeState = {
  isDark: false,
  systemTheme: "light", // alternative is "dark"
  // themePreference: undefined
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkModeOn: (state) => {
      state.isDark = true;
    },
    setDarkModeOff: (state) => {
      state.isDark = false;
    },
    setSystemTheme: (state, action: PayloadAction<ColorSchemeName>) => {
      state.systemTheme = action.payload;
    },

    // update the user's theme preference to the passed color scheme
    setThemePreference: (
      state,
      action: PayloadAction<ColorSchemeName | undefined>
    ) => {
      state.themePreference = action.payload || undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSystemTheme,
  setDarkModeOn,
  setDarkModeOff,
  setThemePreference,
} = themeSlice.actions;

// We export the reducer function so that it can be added to the store
export default themeSlice.reducer;
