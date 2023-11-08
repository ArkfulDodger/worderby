// Import the createSlice API from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { mockTurns } from "../features/game/mockData";
import { TIMER_COUNT, TURNS_PER_GAME } from "../features/game/constants";
import { getPrompt, isPlayersTurn, isTurnPlayable } from "../utils/helpers";
import { initialDemoState } from "../features/game/demoGameData";
import { GameMode } from "../features/game/enums";

// Define types for the slice state
export type Player = {
  name: string;
  avatar?: string;
};

// a completed turn object
export type Turn = {
  isPlayer: boolean;
  turnNumber: number;
  startedAt: string;
  playedAt: string;
  word: string;
  pNum: number;
  endTimer?: number;
};

// a turn which is actively in progress
export type ActiveTurn = {
  turnNumber: number; // the active turn number
  startTime: string; // the ISO timestamp when the user's turn began (when prompt loads on screen)
  timerCount?: number; // the number displayed on the timer, if used
  pIndexInput: number; // the char index in the prompt the player is trying to select
  wordInput: string; // the additional input the user has typed
  inputFocused?: boolean; // whether the player input is focused
  isWordSplit?: boolean; // whether the input needs to be split for length
};

// the master state of the currently open game in the app
export type GameState = {
  id: number;
  mode: GameMode;
  streakCount: number;
  isSinglePlayer: boolean;
  isPlayerFirst: boolean;
  isEnded: boolean;
  opponent: Player;
  startingWord: string;
  turns: Turn[];
  initialRestrictions: string[];
  activeTurn?: ActiveTurn;
  isLoading?: boolean;
};

// demo data for initial setup testing
const isPlayerFirst = true;
const initialWord = "word";
const initialTurns = mockTurns.slice(0, 0);
const initialActiveTurn = isPlayersTurn(initialTurns.length, isPlayerFirst)
  ? {
      turnNumber: initialTurns.length + 1,
      timerCount: 10,
      pIndexInput: 1,
      wordInput: "",
    }
  : undefined;

// This is the initial state of the slice
const initialState: GameState = {
  id: NaN,
  mode: GameMode.Demo,
  streakCount: 0,
  isSinglePlayer: true,
  isPlayerFirst: isPlayerFirst,
  isEnded: false,
  opponent: {
    name: "Worderbot",
    avatar: "",
  },
  startingWord: initialWord,
  turns: initialTurns,
  initialRestrictions: [],
  // activeTurn: initialActiveTurn,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // load the demo game into state
    loadDemoGame: (state) => {
      state = initialDemoState;
    },

    // bring an immediate end to the current game
    endGame: (state) => {
      state.isEnded = true;
    },

    // add a turn to the current game
    playNewTurn: (state, action: PayloadAction<Turn>) => {
      const newTurn = action.payload;

      // escape if new turn is not playable
      if (
        !isTurnPlayable(
          newTurn,
          state.turns,
          state.startingWord,
          state.isPlayerFirst
        )
      ) {
        state.isLoading = false;
        return;
      }

      // get updated turns array with new turn, ensure in turn order
      const newTurns = [...state.turns, newTurn].sort(
        (a, b) => a.turnNumber - b.turnNumber
      );

      // set the turns in state
      state.turns = newTurns;

      // // clear the active turn in state
      state.activeTurn = undefined;

      // if that was the last turn, end the game and clear the prompt
      if (newTurns.length >= TURNS_PER_GAME) {
        state.isEnded = true;
      }

      state.isLoading = false;
    },

    // decrement the timer (if active turn and timer in use)
    decrementTimerCount: (state) => {
      if (state.activeTurn?.timerCount) state.activeTurn.timerCount -= 1;
    },

    // set the prompt input to the given index
    handlePromptInput: (state, action: PayloadAction<number>) => {
      if (state.activeTurn) state.activeTurn.pIndexInput = action.payload;
    },

    // set the current text in the active turn
    setWordInput: (state, action: PayloadAction<string>) => {
      if (state.activeTurn) state.activeTurn.wordInput = action.payload;
    },

    // start the next turn, if able
    startTurn: (state) => {
      // only allow if play is to the user-player
      if (isPlayersTurn(state.turns.length, state.isPlayerFirst)) {
        // get the next turn number
        let newTurnNumber = state.turns.length + 1;

        // escape if the turn has already been started
        if (state.activeTurn?.turnNumber === newTurnNumber) return;

        // get the prompt
        let prompt = getPrompt(state.startingWord, state.turns, newTurnNumber);

        state.activeTurn = {
          turnNumber: newTurnNumber,
          timerCount: state.mode === GameMode.Casual ? undefined : TIMER_COUNT,
          pIndexInput: Math.min(1, prompt.length - 1),
          wordInput: "",
          startTime: new Date().toISOString(),
        };
      } else {
        console.error("Start Turn Error:", "Not the player's turn yet.");
      }
    },

    // set the input focus to the given boolean
    setInputFocus: (state, action: PayloadAction<boolean>) => {
      if (state.activeTurn) state.activeTurn.inputFocused = action.payload;
    },

    toggleInputFocus: (state) => {
      if (state.activeTurn)
        state.activeTurn.inputFocused = !state.activeTurn.inputFocused;
    },

    // record a start timestamp for the active turn (only if it hasn't already been set)
    recordStartTime: (state) => {
      if (state.activeTurn && !state.activeTurn.startTime) {
        state.activeTurn.startTime = new Date().toISOString();
      }
    },

    setIsWordSplit: (state, action: PayloadAction<boolean>) => {
      if (state.activeTurn) state.activeTurn.isWordSplit = action.payload;
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadDemoGame,
  endGame,
  playNewTurn,
  decrementTimerCount,
  handlePromptInput,
  setWordInput,
  startTurn,
  recordStartTime,
  setInputFocus,
  toggleInputFocus,
  setIsWordSplit,
  setIsLoading,
} = gameSlice.actions;

// We export the reducer function so that it can be added to the store
export default gameSlice.reducer;
