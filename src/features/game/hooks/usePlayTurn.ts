import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Turn, playNewTurn, setIsLoading } from "../../../slices/gameSlice";
import { getTurnPenalty } from "../../../utils/helpers";
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

  const attemptWord = () => {
    // note the timestamp
    const timestamp = new Date().toISOString();

    // start loading
    dispatch(setIsLoading(true));

    // check errors
    if (!activeTurn || isAttemptWordError())
      return dispatch(setIsLoading(false));

    // get the word
    const word = usedPrompt + wordInput;

    // TODO: confirm word exists

    // calculate penalty
    const turnPenalty =
      mode === GameMode.Casual
        ? undefined
        : getTurnPenalty(activeTurn.startTime, timestamp);

    // make turn object
    const turn: Turn = {
      isPlayer: true,
      turnNumber: activeTurn.turnNumber,
      startedAt: activeTurn.startTime,
      playedAt: timestamp,
      word: word,
      pNum: usedPrompt.length,
      penalty: turnPenalty,
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
