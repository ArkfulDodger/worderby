// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Appearance, ColorSchemeName } from "react-native";
import { RootState } from "../store";

// Define a type for the slice state
interface ThemeState {
  isDark: boolean;
  systemTheme: ColorSchemeName;
  themePreference: ColorSchemeName | "system";
}

// This is the initial state of the slice
const initialState: ThemeState = {
  isDark: false,
  systemTheme: "light", // alternative is "dark"
  themePreference: "system",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // refreshes the system theme, updating app theme if needed
    refreshSystemTheme: (state) => {
      // get current system theme
      const systemTheme = Appearance.getColorScheme();

      // update system theme in state
      state.systemTheme = systemTheme;

      // if app theme preference is "system", update dark mode status
      if (state.themePreference === "system") {
        state.isDark = systemTheme === "dark";
      }
    },

    // update the user's theme preference to the passed color scheme, and make active theme
    setThemePreference: (
      state,
      action: PayloadAction<ColorSchemeName | "system">
    ) => {
      // update the theme preference in state
      state.themePreference = action.payload;

      // enforce the theme according to the preference
      switch (action.payload) {
        case "dark":
          state.isDark = true;
          break;
        case "light":
          state.isDark = false;
          break;
        default:
          state.isDark = state.systemTheme === "dark";
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { refreshSystemTheme, setThemePreference } = themeSlice.actions;

export const selectIsDark = (state: RootState) => state.theme.isDark;

// We export the reducer function so that it can be added to the store
export default themeSlice.reducer;
