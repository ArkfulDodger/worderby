// Import the createSlice API from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
import { OnlineGameMode } from "../features/game/types";
import { mockTurns } from "../features/game/mockData";

// Define a type for the slice state
export type Player = {
  name: string;
  avatar?: string;
};

export type Turn = {
  isPlayerWord: boolean;
  turnNumber: number;
  startedAt: Date;
  playedAt: Date;
  word: string;
  pNum: number;
  penalty?: number;
};

export type GameMode = OnlineGameMode | "demo";

export type GameState = {
  mode: GameMode;
  isSinglePlayer: boolean;
  isPlayerFirst: boolean;
  isEnded: boolean;
  opponent: Player;
  startingWord: string;
  turns: Turn[];
  initialRestrictions: string[];
};

// This is the initial state of the slice
const initialState: GameState = {
  mode: "demo",
  isSinglePlayer: true,
  isPlayerFirst: true,
  isEnded: false,
  opponent: {
    name: "Worderbot",
    avatar: "",
  },
  startingWord: "word",
  turns: mockTurns.slice(0, 4),
  initialRestrictions: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    endGame: (state) => {
      state.isEnded = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { endGame } = gameSlice.actions;

// We export the reducer function so that it can be added to the store
export default gameSlice.reducer;
