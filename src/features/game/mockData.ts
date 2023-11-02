import { Turn } from "../../reducers/gameReducer";

const staticDate = new Date().toISOString();

// longest English word (for testing): pneumonoultramicroscopicsilicovolcanoconiosis

const playerTurn1: Turn = {
  isPlayerWord: true,
  turnNumber: 1,
  startedAt: staticDate,
  playedAt: staticDate,
  word: "order",
  pNum: 3,
};

const opponentTurn2: Turn = {
  isPlayerWord: false,
  turnNumber: 2,
  startedAt: staticDate,
  playedAt: staticDate,
  word: "derby",
  pNum: 3,
};

const playerTurn3: Turn = {
  isPlayerWord: true,
  turnNumber: 3,
  startedAt: staticDate,
  playedAt: staticDate,
  word: "byte",
  pNum: 2,
};

const opponentTurn4: Turn = {
  isPlayerWord: false,
  turnNumber: 4,
  startedAt: staticDate,
  playedAt: staticDate,
  word: "test",
  pNum: 2,
};

const playerTurn5: Turn = {
  isPlayerWord: true,
  turnNumber: 5,
  startedAt: staticDate,
  playedAt: staticDate,
  word: "establish",
  pNum: 3,
};

const opponentTurn6: Turn = {
  isPlayerWord: false,
  turnNumber: 6,
  startedAt: staticDate,
  playedAt: staticDate,
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
