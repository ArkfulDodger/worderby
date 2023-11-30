import { Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useWordList from "../../../hooks/useWordList";
import {
  Turn,
  playNewTurn,
  setIsLoading,
} from "../../../store/slices/gameSlice";
import { deriveStartTimeFromTimer, getEndTimer } from "../../../utils/helpers";
import { GameMode } from "../enums";
import {
  selectActiveTurn,
  selectMode,
  selectRestrictions,
  selectUsedUnusedPrompt,
  selectWordInput,
} from "../gameSelectors";
import { errorToast, warnToast } from "../gameToastHelpers";

// logic for letting the user attempt to play a word in the current game
const usePlayTurn = () => {
  const dispatch = useAppDispatch();
  const { usedPrompt } = useAppSelector(selectUsedUnusedPrompt);
  const wordInput = useAppSelector(selectWordInput);
  const activeTurn = useAppSelector(selectActiveTurn);
  const mode = useAppSelector(selectMode);
  const restrictions = useAppSelector(selectRestrictions);
  const { isWordOnList } = useWordList();

  // checks for whether there are any errors to prevent the word attempt
  const isAttemptWordError = () => {
    // confirm usedPrompt is usable
    if (usedPrompt.length < 1) {
      console.error(
        "Attempt Word Error:",
        "Need to select at least one letter from prompt"
      );
      errorToast("error: no prompt letters used");
      return true;
    }

    // error out if no active turn
    if (!activeTurn) {
      console.log(
        "Attempt Word Error:",
        "There is no active turn data to play"
      );
      errorToast("error: no active turn detected");
      return true;
    }
  };

  // based on the played-at timestamp, recorded start time, and last registered timer count,
  // determine final timer and start time values for a turn
  const getFinalTimerValues = (
    playdAtTimestamp: string,
    startTime: string | undefined,
    timerCount: number | undefined
  ) => {
    let endTimer = timerCount;
    let finalStartTime = startTime;

    if (finalStartTime) {
      // if there is a start time, calculate the official end timer
      endTimer =
        mode === GameMode.Casual
          ? undefined
          : getEndTimer(finalStartTime, playdAtTimestamp, timerCount);
    } else {
      // if there is no start time, calculate it from the last known timer count
      // will assume the default TIMER_COUNT if no timer count is found/provided, as for casual games
      finalStartTime = deriveStartTimeFromTimer(playdAtTimestamp, timerCount);
    }

    return { endTimer, finalStartTime };
  };

  // return whether a word can be played for the current turn
  const isWordValid = async (word: string) => {
    // confirm user has provided input
    if (!wordInput || wordInput.length < 1) {
      warnToast("Must add at least one letter!");
      return false;
    }

    // confirm does not end in any restricted ending
    for (let i = 0; i < restrictions.length; i++) {
      const restriction = restrictions[i];
      if (word.endsWith(restriction)) {
        warnToast(`Word cannot end in -${restriction}`);
        return false;
      }
    }

    // confirm is real word (validate from word list)
    try {
      const wordExists = await isWordOnList(word);
      if (!wordExists) {
        warnToast("Oops! Not a word!");
        return false;
      }
    } catch (error) {
      errorToast("Error: could not verify if word exists");
      Alert.alert("error:", JSON.stringify(error, null, 2));
      return false;
    }

    // TODO: confirm is not excluded language (hate speech, etc.)

    return true;
  };

  // stops the play attempt, ensuring loading is false so play may continue
  const stopAttempt = () => {
    dispatch(setIsLoading(false));
    return;
  };

  // called when the user attempts to play a word for their turn
  // results in either the turn being played, or the word being rejected as unplayable
  const attemptWord = async () => {
    // note the time values for when the attempt was made
    const timestamp = new Date().toISOString();
    const timerCount = activeTurn?.timerCount;

    // clear any previous toast messages
    gameToast?.hideAll();

    // start loading to prevent repeat submissions
    dispatch(setIsLoading(true));

    // check for word attempt errors
    if (!activeTurn || isAttemptWordError()) return stopAttempt();

    // get and validate the word
    const word = usedPrompt + wordInput;
    const isValid = await isWordValid(word);
    if (!isValid) return stopAttempt();

    // determine final values to use for timer and start time
    let { endTimer, finalStartTime } = getFinalTimerValues(
      timestamp,
      activeTurn.startTime,
      timerCount
    );

    // make turn object
    const turn: Turn = {
      isPlayer: true,
      turnNumber: activeTurn.turnNumber,
      startedAt: finalStartTime,
      playedAt: timestamp,
      word: word,
      pNum: usedPrompt.length,
      endTimer: endTimer,
    };

    // play turn
    playLocalTurn(turn);
  };

  const playLocalTurn = (turn: Turn) => {
    // play turn in state
    dispatch(playNewTurn(turn));
  };

  return { attemptWord };
};

export default usePlayTurn;
