// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppStateStatus, ColorSchemeName } from "react-native";

// Define a type for the slice state
interface SettingsState {
  appState: AppStateStatus;
  isAppActive: boolean;
  isMuted: boolean;
  themePreference?: ColorSchemeName;
}

// This is the initial state of the slice
const initialState: SettingsState = {
  appState: "active",
  isAppActive: true,
  isMuted: false,
  // themePreference: undefined
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // update the user's theme preference to the passed color scheme
    setThemePreference: (
      state,
      action: PayloadAction<ColorSchemeName | undefined>
    ) => {
      state.themePreference = action.payload || undefined;
    },

    // toggle the user's audio mute status
    toggleIsMuted: (state) => {
      state.isMuted = !state.isMuted;
    },

    // update the app's state (whether the app is currently active/focused), and boolean
    setAppState: (state, action: PayloadAction<AppStateStatus>) => {
      state.appState = action.payload;
      state.isAppActive = action.payload === "active";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThemePreference, toggleIsMuted, setAppState } =
  settingsSlice.actions;

// We export the reducer function so that it can be added to the store
export default settingsSlice.reducer;
