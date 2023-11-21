// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppStateStatus } from "react-native";
import { RootState } from "../store";

// Define a type for the slice state
interface SystemState {
  appState: AppStateStatus;
  isMuted: boolean;
}

// This is the initial state of the slice
const initialState: SystemState = {
  appState: "active",
  isMuted: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    // toggle the user's audio mute status
    toggleIsMuted: (state) => {
      state.isMuted = !state.isMuted;
    },

    // update the app's state (whether the app is currently active/focused), and boolean
    setAppState: (state, action: PayloadAction<AppStateStatus>) => {
      state.appState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsMuted, setAppState } = systemSlice.actions;

export const selectIsAppActive = (state: RootState) =>
  state.system.appState === "active";
export const selectIsMuted = (state: RootState) => state.system.isMuted;

// We export the reducer function so that it can be added to the store
export default systemSlice.reducer;
