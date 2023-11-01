import { Turn } from "../../reducers/gameReducer";

const playerTurn1: Turn = {
  isPlayerWord: true,
  turnNumber: 1,
  startedAt: new Date(),
  playedAt: new Date(),
  word: "order",
  pNum: 3,
};

const opponentTurn2: Turn = {
  isPlayerWord: false,
  turnNumber: 2,
  startedAt: new Date(),
  playedAt: new Date(),
  word: "derby",
  pNum: 3,
};

const playerTurn3: Turn = {
  isPlayerWord: true,
  turnNumber: 3,
  startedAt: new Date(),
  playedAt: new Date(),
  word: "byte",
  pNum: 2,
};

const opponentTurn4: Turn = {
  isPlayerWord: false,
  turnNumber: 4,
  startedAt: new Date(),
  playedAt: new Date(),
  word: "test",
  pNum: 2,
};

const playerTurn5: Turn = {
  isPlayerWord: true,
  turnNumber: 5,
  startedAt: new Date(),
  playedAt: new Date(),
  word: "establish",
  pNum: 3,
};

const opponentTurn6: Turn = {
  isPlayerWord: false,
  turnNumber: 6,
  startedAt: new Date(),
  playedAt: new Date(),
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
