import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import {
  getGameScore,
  getPermittedTurns,
  getPrompt,
  getWorderbyte,
  isPlayersTurn,
} from "../../utils/helpers";
import { GameEndType, GameResult, RoundPhase } from "./enums";
import { Turn } from "../../slices/gameSlice";

// simple state selectors
export const selectEndType = (state: RootState) => state.game.endType;
export const selectIsEnded = (state: RootState) => !!state.game.endType;
export const selectStreakCount = (state: RootState) => state.game.streakCount;
export const selectInitialRestrictions = (state: RootState) =>
  state.game.initialRestrictions;
export const selectIsPlayerFirst = (state: RootState) =>
  state.game.isPlayerFirst;
export const selectOpponent = (state: RootState) => state.game.opponent;
export const selectIsSinglePlayer = (state: RootState) =>
  state.game.isSinglePlayer;
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
export const selectIsWordSplit = (state: RootState) =>
  !!state.game.activeTurn?.isWordSplit;
export const selectActiveTurn = (state: RootState) => state.game.activeTurn;

// special selector for getting whether or not it is the player's turn
export const selectIsPlayerTurn = (state: RootState) =>
  isPlayersTurn(state.game.turns.length, state.game.isPlayerFirst);

// select whether or not is a worderbot turn (opponent turn in single player)
export const selectIsWorderbotTurn = (state: RootState) => {
  const isEnded = selectIsEnded(state);
  const isPlayerTurn = selectIsPlayerTurn(state);
  const isSinglePlayer = selectIsSinglePlayer(state);

  return !isEnded && isSinglePlayer && !isPlayerTurn;
};

// selects the current turn (whether actively started or not)
export const selectCurrentTurnNumber = (state: RootState) =>
  selectTurns(state).length + 1;

// special selector for getting whether or not the player is actively playing their turn
export const selectIsActivePlayerTurn = (state: RootState) => {
  return (
    selectIsPlayerTurn(state) &&
    !!state.game.activeTurn &&
    state.game.activeTurn.turnNumber === selectCurrentTurnNumber(state)
  );
};

// Memoized: select the turns the player is currently able to view
export const selectPermittedTurns = createSelector(
  [selectIsActivePlayerTurn, selectTurns, selectIsEnded],
  (isActivePlayerTurn, turns, isEnded) =>
    getPermittedTurns(turns, isActivePlayerTurn, isEnded)
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
  const isPlayersTurn = selectIsPlayerTurn(state);
  const noTurns = selectTurns(state).length === 0;

  // if the game has ended (for any reason), show the results
  if (!!state.game.endType) return RoundPhase.Results;
  // if it is the player's turn, and there is an active turn in state, show the player turn frame
  else if (isActivePlayerTurn) return RoundPhase.PlayerTurn;
  // if its the first turn, play is to the player, but they have not begun yet, show new game
  else if (noTurns && isPlayersTurn) return RoundPhase.NewGame;
  // otherwise, show the opponent turn frame
  else return RoundPhase.OpponentTurn;
};

// selects the worderbyte the player is allowed to see
export const selectWorderbyte = createSelector(
  [selectPermittedTurns, selectStartingWord, selectRoundPhase],
  (permittedTurns, startingWord, phase) =>
    phase === RoundPhase.NewGame
      ? ""
      : getWorderbyte(startingWord, permittedTurns)
);

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
  return !!wordInput && wordInput.length > 0;
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

// select the last word played by the player
export const selectLastPlayerTurn = createSelector(
  [selectTurns],
  (turns: Turn[]) => {
    const result: Turn | undefined = turns.reduce(
      (mostRecentTurn: Turn | undefined, turn: Turn) => {
        if (
          turn.isPlayer &&
          (!mostRecentTurn || turn.turnNumber > mostRecentTurn.turnNumber)
        ) {
          return turn;
        }
        return mostRecentTurn;
      },
      undefined
    );
    return result;
  }
);

// select the result of the game based on the score and end state
export const selectGameResult = createSelector(
  [selectEndType, selectUserScore, selectOpponentScore],
  (endType, playerScore, opponentScore) => {
    switch (endType) {
      case undefined:
        return GameResult.Ongoing;
      case GameEndType.Unknown:
        return GameResult.Unknown;
      case GameEndType.OpponentQuit:
        return GameResult.OpponentQuit;
      case GameEndType.PlayerQuit:
        return GameResult.PlayerQuit;
      case GameEndType.Completed:
        if (playerScore === opponentScore) return GameResult.Draw;
        else if (playerScore > opponentScore) return GameResult.Win;
        else return GameResult.Lose;
      default:
        return GameResult.Unknown;
    }
  }
);

export const selectRestrictions = createSelector(
  [selectInitialRestrictions, selectTurns],
  (initialRestrictions, turns) => {
    const newRestrictions = turns.map((turn) => turn.word.slice(turn.pNum));
    return [...initialRestrictions, ...newRestrictions].sort();
  }
);
