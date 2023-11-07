import { Turn } from "../../slices/gameSlice";
import { STATIC_DATE } from "../../utils/constants";

const playerTurn1: Turn = {
  isPlayer: true,
  turnNumber: 1,
  startedAt: STATIC_DATE,
  playedAt: STATIC_DATE,
  word: "order",
  pNum: 3,
};

const opponentTurn2: Turn = {
  isPlayer: false,
  turnNumber: 2,
  startedAt: STATIC_DATE,
  playedAt: STATIC_DATE,
  word: "derby",
  pNum: 3,
};

const playerTurn3: Turn = {
  isPlayer: true,
  turnNumber: 3,
  startedAt: STATIC_DATE,
  playedAt: STATIC_DATE,
  word: "byte",
  pNum: 2,
};

const opponentTurn4: Turn = {
  isPlayer: false,
  turnNumber: 4,
  startedAt: STATIC_DATE,
  playedAt: STATIC_DATE,
  word: "test",
  pNum: 2,
};

const playerTurn5: Turn = {
  isPlayer: true,
  turnNumber: 5,
  startedAt: STATIC_DATE,
  playedAt: STATIC_DATE,
  word: "establish",
  pNum: 3,
};

const opponentTurn6: Turn = {
  isPlayer: false,
  turnNumber: 6,
  startedAt: STATIC_DATE,
  playedAt: STATIC_DATE,
  word: "ship",
  pNum: 2,
};

export const mockTurns: Turn[] = [
  playerTurn1,
  opponentTurn2,
  playerTurn3,
  opponentTurn4,
  playerTurn5,
  opponentTurn6,
];
