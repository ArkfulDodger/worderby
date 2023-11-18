import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useWordDatabase from "../../../hooks/useWordDatabase";
import { Turn, playNewTurn, setIsLoading } from "../../../slices/gameSlice";
import { deriveStartTimeFromTimer, getEndTimer } from "../../../utils/helpers";
import { GameMode } from "../enums";
import {
  selectActiveTurn,
  selectMode,
  selectUsedUnusedPrompt,
  selectWordInput,
} from "../gameSelectors";

const usePlayTurn = () => {
  const dispatch = useAppDispatch();
  const { usedPrompt } = useAppSelector(selectUsedUnusedPrompt);
  const wordInput = useAppSelector(selectWordInput);
  const activeTurn = useAppSelector(selectActiveTurn);
  const mode = useAppSelector(selectMode);
  const { isWordOnList } = useWordDatabase();

  const isAttemptWordError = () => {
    // confirm usedPrompt and wordInput are usable
    if (usedPrompt.length < 1) {
      console.error(
        "Attempt Word Error:",
        "Need to select at least one letter from prompt"
      );
      return true;
    }

    // confirm usedPrompt and wordInput are usable
    if (!wordInput || wordInput.length < 1) {
      console.error("Attempt Word Error:", "Must add at least one letter.");
      return true;
    }

    // error out if no active turn
    if (!activeTurn) {
      console.log(
        "Attempt Word Error:",
        "There is no active turn data to play"
      );
      return true;
    }
  };

  const attemptWord = async () => {
    // note the timestamp
    const timestamp = new Date().toISOString();
    const timerCount = activeTurn?.timerCount;

    // start loading
    dispatch(setIsLoading(true));

    // check errors
    if (!activeTurn || isAttemptWordError()) {
      dispatch(setIsLoading(false));
      return;
    }

    // get the word
    const word = usedPrompt + wordInput;

    // TODO: confirm word exists
    try {
      const wordExists = await isWordOnList(word);
      if (!wordExists) {
        dispatch(setIsLoading(false));
        return;
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      return;
    }

    // calculate final endTimer and startedAt values
    let endTimer = timerCount;
    let finalStartTime = activeTurn.startTime;

    if (finalStartTime) {
      // if there is a start time, calculate the official end timer
      endTimer =
        mode === GameMode.Casual
          ? undefined
          : getEndTimer(finalStartTime, timestamp, timerCount);
    } else {
      // if there is no start time, calculate it from the last known timer count
      // will assume the default TIMER_COUNT if no timer count is found/provided, as for casual games
      finalStartTime = deriveStartTimeFromTimer(timestamp, timerCount);
    }

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
