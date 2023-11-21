import { GameState, Player } from "../../store/slices/gameSlice";
import { GameMode } from "./enums";

export const demoWorderbot: Player = {
  name: "Worderbot",
  avatar: "",
};

// This is the initial state of the demo game
export const initialDemoState: GameState = {
  id: NaN,
  mode: GameMode.Demo,
  streakCount: 0,
  isSinglePlayer: true,
  isPlayerFirst: true,
  opponent: demoWorderbot,
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

const DEMO_WORDERBOT_WORDS: { [i: number]: { word: string; pNum: number } } = {
  1: { word: "order", pNum: 3 },
  2: { word: "derby", pNum: 3 },
  3: { word: "byte", pNum: 2 },
  4: { word: "test", pNum: 2 },
  5: { word: "establish", pNum: 3 },
  6: { word: "ship", pNum: 2 },
};
