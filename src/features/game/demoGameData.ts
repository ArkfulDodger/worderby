import { GameState } from "../../slices/gameSlice";
import { GameMode } from "./enums";

// This is the initial state of the demo game
export const initialDemoState: GameState = {
  id: NaN,
  mode: GameMode.Demo,
  streakCount: 0,
  isSinglePlayer: true,
  isPlayerFirst: true,
  isEnded: false,
  opponent: {
    name: "Worderbot",
    avatar: "",
  },
  startingWord: "word",
  turns: [],
  initialRestrictions: [],
  activeTurn: {
    turnNumber: 1,
    timerCount: 10,
    pIndexInput: 1,
    wordInput: "",
  },
};
