import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import {
  getGameScore,
  getPermittedTurns,
  getPrompt,
  getWorderbyte,
  isPlayersTurn,
} from "../../utils/helpers";
import { RoundPhase } from "./enums";

// simple state selectors
export const selectIsEnded = (state: RootState) => state.game.isEnded;
export const selectOpponent = (state: RootState) => state.game.opponent;
export const selectMode = (state: RootState) => state.game.mode;
export const selectTurns = (state: RootState) => state.game.turns;
export const selectStartingWord = (state: RootState) => state.game.startingWord;
export const selectTimerCount = (state: RootState) =>
  state.game.activeTurn?.timerCount;
export const selectActiveTurnNumber = (state: RootState) =>
  state.game.activeTurn?.turnNumber;
export const selectPIndexInput = (state: RootState) =>
  state.game.activeTurn?.pIndexInput;
export const selectGameLoading = (state: RootState) => !!state.game.isLoading;
export const selectWordInput = (state: RootState) =>
  state.game.activeTurn?.wordInput;
export const selectInputFocus = (state: RootState) =>
  !!state.game.activeTurn?.inputFocused;

// special selector for getting whether or not it is the player's turn
export const selectIsPlayerTurn = (state: RootState) =>
  isPlayersTurn(state.game.turns.length, state.game.isPlayerFirst);

// special selector for getting whether or not the player is actively playing their turn
export const selectIsActivePlayerTurn = (state: RootState) => {
  return selectIsPlayerTurn(state) && !!state.game.activeTurn;
};

// Memoized: select the turns the player is currently able to view
export const selectPermittedTurns = createSelector(
  [selectIsActivePlayerTurn, selectTurns],
  (isActivePlayerTurn, turns) => getPermittedTurns(turns, isActivePlayerTurn)
);

// Memoized: select the user-player's current game score
export const selectUserScore = createSelector([selectTurns], (turns) =>
  getGameScore(turns, true)
);

// Memoized: select the opponent's current game score
export const selectOpponentScore = createSelector(
  [selectPermittedTurns],
  (turns) => getGameScore(turns, false)
);

// selects the worderbyte the player is allowed to see
export const selectWorderbyte = createSelector(
  [selectPermittedTurns, selectStartingWord],
  (permittedTurns, startingWord) => getWorderbyte(startingWord, permittedTurns)
);

// selects the current prompt, or nothing if there is no active turn
export const selectPrompt = createSelector(
  [
    selectIsActivePlayerTurn,
    selectActiveTurnNumber,
    selectStartingWord,
    selectTurns,
  ],
  (isActivePlayerTurn, activeTurnNumber, startingWord, turns) =>
    isActivePlayerTurn && activeTurnNumber
      ? getPrompt(startingWord, turns, activeTurnNumber)
      : ""
);

// select the active pIndex for the active turn (pIndex input clamped to 1)
export const selectPIndex = (state: RootState) => {
  return Math.max(1, selectPIndexInput(state) || 1);
};

// select the current game phase the player is in
export const selectRoundPhase = (state: RootState) => {
  const isActivePlayerTurn = selectIsActivePlayerTurn(state);

  // if the game has ended (for any reason), show the results
  if (state.game.isEnded) return RoundPhase.Results;
  // if it is the player's turn, and there is an active turn in state, show the player turn frame
  else if (isActivePlayerTurn) return RoundPhase.PlayerTurn;
  // otherwise, show the opponent turn frame
  else return RoundPhase.OpponentTurn;
};

// select the prompt substrings which are used/unused
export const selectUsedUnusedPrompt = (state: RootState) => {
  const prompt = selectPrompt(state);
  const pIndex = selectPIndex(state);

  return {
    unusedPrompt: prompt.slice(0, pIndex),
    usedPrompt: prompt.slice(pIndex),
  };
};

// can the current word input be submitted (is at least one character)
export const selectCanAttemptSubmit = (state: RootState) => {
  const wordInput = selectWordInput(state);
  return !!wordInput && wordInput.length > 1;
};

// can the user initiate their next turn
export const selectCanStartTurn = (state: RootState) => {
  const isPlayerTurn = selectIsPlayerTurn(state);
  const isActivePlayerTurn = selectIsActivePlayerTurn(state);

  return isPlayerTurn && !isActivePlayerTurn;
};

// select the current word to submit based on inputs
export const selectPlayWord = (state: RootState) => {
  const { usedPrompt } = selectUsedUnusedPrompt(state);
  return usedPrompt + state.game.activeTurn?.wordInput || "";
};