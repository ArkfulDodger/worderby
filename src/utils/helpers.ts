import {
  ADDED_LETTER_VALUE,
  MAX_ADDED_SCORE,
  PROMPT_LETTER_VALUE,
} from "../features/game/constants";
import { Turn } from "../reducers/gameReducer";

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

    if (forPlayer === turn.isPlayerWord) {
      score += getTurnScore(turn, true);
    }
  }

  return score;
};
