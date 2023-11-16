import { PixelRatio } from "react-native";
import {
  ADDED_LETTER_VALUE,
  ALLOW_TIMER_BONUS,
  MAX_ADDED_SCORE,
  MIN_TIMER,
  PROMPT_LETTER_VALUE,
  TIMER_COUNT,
  TIMER_MS_PER_COUNT,
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

// get the current worderbyte given a startig word and played turns
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

// get the timer score bonus/penalty for the end timer for a turn
export const getTimerScore = (endTimer?: number) => {
  // get the timer score, only allowing positiv value if timer bonus is on
  let timeScore = ALLOW_TIMER_BONUS
    ? endTimer || 0
    : Math.min(0, endTimer || 0);

  return timeScore;
};

// get the score from a given turn, optionally subtracting any penalty
export const getTurnScore = (turn: Turn, factorTime?: boolean) => {
  // get the base score
  let baseScore =
    turn.pNum * PROMPT_LETTER_VALUE +
    Math.min(
      MAX_ADDED_SCORE,
      (turn.word.length - turn.pNum) * ADDED_LETTER_VALUE
    );

  let timerScore = getTimerScore(turn.endTimer);

  // provide score, including timeScore if needed
  return factorTime ? baseScore + timerScore : baseScore;
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

// return a styleSheet number (like padding, margin, etc) as a number
export const getStyleNumberValue = (value?: string | number) => {
  // return zero if not present
  if (!value) return 0;
  // return the number if already a number
  else if (typeof value === "number") return value;
  // return the parsed int if a string
  else return parseInt(value);
};

export const calculateTimeDifferenceInMilliseconds = (
  startedAt: string,
  playedAt?: string
) => {
  const startedDate = new Date(startedAt);
  const playedDate = playedAt ? new Date(playedAt) : new Date();

  // Ensure the parsing was successful
  if (isNaN(startedDate.getTime()) || isNaN(playedDate.getTime())) {
    console.error("Timer Bonus Error", "Invalid date format");
    return undefined;
  }

  // Calculate the time difference in milliseconds
  const timeDifference = playedDate.getTime() - startedDate.getTime();

  return timeDifference;
};

// calculate end timer from the provided timestamps, or fall back to timer count from state
export const getEndTimer = (
  startedAt: string,
  playedAt: string,
  timerCount?: number
) => {
  const turnMilliseconds = calculateTimeDifferenceInMilliseconds(
    startedAt,
    playedAt
  );

  // if time cannot be calculated, use time from state
  if (!turnMilliseconds) {
    if (timerCount) return timerCount;
    else {
      console.error("Timer Error:", "Missing time and time stamp");
      return 0;
    }
  }

  // Divide the play time by the milliseconds per count
  const completedTurnCounts = Math.floor(turnMilliseconds / TIMER_MS_PER_COUNT);

  // get endTimer clamped bewteen min and start time
  const endTimer = Math.max(MIN_TIMER, TIMER_COUNT - completedTurnCounts);

  return endTimer;
};

// use the final timer value to calculate an approximate start time
export const deriveStartTimeFromTimer = (
  playedAt: string,
  timerCount?: number
) => {
  // Convert playedAt to milliseconds since epoch
  const playedAtMs: number = new Date(playedAt).getTime();

  // Calculate the time difference in milliseconds
  const timeDifferenceMs: number = timerCount
    ? timerCount * TIMER_MS_PER_COUNT
    : TIMER_COUNT * TIMER_MS_PER_COUNT;

  // Calculate the new timestamp
  const newTimestampMs: number = playedAtMs - timeDifferenceMs;

  // Create a new Date object with the calculated timestamp
  const newTimestamp: Date = new Date(newTimestampMs);

  // Return the new timestamp in ISO format
  return newTimestamp.toISOString();
};

// get from a string array an array of only its unique values
export const getUniqueStringArray = (array: string[]) => {
  const newArray = array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return newArray;
};

// takes a standard size and scales it with font accessibility scale
export const fontScaled = (size: number) => {
  const scaleFactor = PixelRatio.getFontScale();
  return size * scaleFactor;
};
