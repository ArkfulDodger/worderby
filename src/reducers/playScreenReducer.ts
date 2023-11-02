// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PlayScreenState {
  timerCount?: number; // the number displayed on the timer, if used
  pIndexInput: number; // the char index in the prompt the player is trying to select
  pIndex: number; // the active char index in effect for the prompt
  wordInput: string; // the additional input the user has typed
}

// This is the initial state of the slice
const initialState: PlayScreenState = {
  // timerCount: 10,
  pIndexInput: 1,
  pIndex: 1,
  wordInput: "",
};

export const playScreenSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    decrementTimerCount: (state) => {
      if (state.timerCount) state.timerCount -= 1;
    },
    handlePromptInput: (state, action: PayloadAction<number>) => {
      state.pIndexInput = action.payload;
      state.pIndex = Math.max(1, action.payload);
    },
    setWordInput: (state, action: PayloadAction<string>) => {
      state.wordInput = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrementTimerCount, handlePromptInput, setWordInput } =
  playScreenSlice.actions;

// We export the reducer function so that it can be added to the store
export default playScreenSlice.reducer;
