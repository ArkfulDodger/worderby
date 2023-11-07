import {
  ADDED_LETTER_VALUE,
  MAX_ADDED_SCORE,
  PROMPT_LETTER_VALUE,
  TURNS_PER_GAME,
} from "../features/game/constants";
import { Turn } from "../slices/gameSlice";

// retrieves the turns the user is permitted to see displayed
// cannot see data from latest opponent turn until starting their own turn or game end
export const getPermittedTurns = (
  turns: Turn[],
  isActivePlayerTurn: boolean,
  isEnded: boolean
) => {
  // if the player is actively taking a turn or game is over, all turns may be viewed
  if (isActivePlayerTurn || isEnded) return turns;
  // if not actively taking a turn, the user can't see the most recent turn unless it is their own
  else {
    return turns
      .sort((a, b) => a.turnNumber - b.turnNumber)
      .filter((turn, i) => turn.isPlayer || i !== turns.length - 1);
  }
};

export const getWorderbyte = (startingWord: string, turns: Turn[]) => {
  // set the worderbyte as the starting word
  let worderbyte = startingWord;

  // ensure turns are in play order
  let orderedTurns = turns.sort((a, b) => a.turnNumber - b.turnNumber);

  // for each turn, add the new letters to the worderbyte
  for (let i = 0; i < orderedTurns.length; i++) {
    const { word, pNum } = orderedTurns[i];
    worderbyte = `${worderbyte}${word.slice(pNum)}`;
  }

  return worderbyte;
};

// get the prompt for the given active turn
export const getPrompt = (
  startingWord: string,
  turns: Turn[],
  activeTurnNumber: number
) => {
  // if the first turn, the prompt is the starting word
  if (activeTurnNumber === 1) return startingWord;
  else {
    let previousTurn = turns.find(
      (turn) => turn.turnNumber === activeTurnNumber - 1
    );
    if (!previousTurn) {
      // if a previous turn cannot be found, error out
      console.error("Prompt Error:", "no prior turn found to generate prompt");
      return "";
    } else {
      // the prompt is the word played the previous turn
      return previousTurn.word;
    }
  }
};

// get the score from a given turn, optionally subtracting any penalty
export const getTurnScore = (turn: Turn, usePenalty?: boolean) => {
  // get the base score
  let baseScore =
    turn.pNum * PROMPT_LETTER_VALUE +
    Math.min(
      MAX_ADDED_SCORE,
      (turn.word.length - turn.pNum) * ADDED_LETTER_VALUE
    );

  // subtract penalty if needed, or just return base score
  return usePenalty ? baseScore - (turn.penalty || 0) : baseScore;
};

// get the current game score for the player or opponent
export const getGameScore = (turns: Turn[], forPlayer: boolean) => {
  // initialize score to 0
  let score = 0;

  // loop through turns and tally scores for the given player
  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];

    if (forPlayer === turn.isPlayer) {
      score += getTurnScore(turn, true);
    }
  }

  return score;
};

// validates whether a turn can be played next in the context of the other turns in the array
// does not validate playability of the word itself
export const isTurnPlayable = (
  newTurn: Turn,
  existingTurns: Turn[],
  startingWord: string,
  isPlayerFirst: boolean
) => {
  let allTurnsHaveBeenPlayed = existingTurns.length >= TURNS_PER_GAME;
  let turnIsNextInOrder = newTurn.turnNumber === existingTurns.length + 1;
  let thereAreTurns = existingTurns.length > 0;
  let previousTurn = thereAreTurns
    ? existingTurns.find((turn) => turn.turnNumber === newTurn.turnNumber - 1)
    : undefined;
  let isThisPlayersTurn = previousTurn
    ? newTurn.isPlayer !== previousTurn.isPlayer
    : newTurn.isPlayer === isPlayerFirst;
  let priorPrompt = previousTurn ? previousTurn.word : startingWord;
  let newWordBuildsOffPrompt =
    priorPrompt.slice(-newTurn.pNum) === newTurn.word.slice(0, newTurn.pNum);

  // error out if turns are already at max
  if (allTurnsHaveBeenPlayed) {
    console.error(
      "Play Turn Error:",
      "All turns have already been played this game."
    );
    return false;
  }

  // error out if turn is not next in the order
  if (!turnIsNextInOrder) {
    console.error(
      "Play Turn Error:",
      "Attempting to play a turn out of order!"
    );
    return false;
  }

  // error out if not the player's turn
  if (!isThisPlayersTurn) {
    console.error("Play Turn Error:", "It is not the player's turn to play!");
    return false;
  }

  // error out if the new word/pnum cannot be formed from the previous
  if (!newWordBuildsOffPrompt) {
    console.error(
      "Play Turn Error:",
      "The new word cannot be played off of the previous turn's word!"
    );
  }

  return true;
};

// return whether the current turn yet to be played is the player's
export const isPlayersTurn = (turnsPlayed: number, isPlayerFirst: boolean) => {
  let thereAreTurnsLeft = turnsPlayed < TURNS_PER_GAME;
  let oddTurnIsNext = turnsPlayed % 2 === 0;
  let playerHasOddTurns = isPlayerFirst;

  return thereAreTurnsLeft && oddTurnIsNext === playerHasOddTurns;
};
