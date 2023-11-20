import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  Turn,
  playNewTurn,
  setIsLoading,
  worderbotForfeit,
} from "../../../slices/gameSlice";
import {
  selectCurrentTurnNumber,
  selectIsWorderbotTurn,
  selectWorderbotPrompt,
} from "../gameSelectors";
import useWordList from "../../../hooks/useWordList";

// control the worderbot opponent
const useWorderbot = () => {
  const dispatch = useAppDispatch();
  const turnNumber = useAppSelector(selectCurrentTurnNumber);
  const isWorderbotTurn = useAppSelector(selectIsWorderbotTurn);
  const prompt = useAppSelector(selectWorderbotPrompt);
  const { selectRandomPlayableWord } = useWordList();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isWorderbotTurn) {
      timeout = setTimeout(() => {
        playWorderbotTurn();
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isWorderbotTurn]);

  const playWorderbotTurn = async () => {
    dispatch(setIsLoading(true));

    // get a word and associated pNum for the worderbot turn
    const { word, pNum } = await selectRandomPlayableWord(prompt);

    // if no word was returned or pNum is not a number, have Worderbot forfeit
    if (!word || Number.isNaN(pNum)) {
      dispatch(worderbotForfeit());
      return;
    }

    // play the worderbot turn
    const newTurn: Turn = {
      isPlayer: false,
      turnNumber: turnNumber,
      startedAt: new Date().toISOString(),
      playedAt: new Date().toISOString(),
      word: word,
      pNum: pNum,
      endTimer: 0, // ensure no timer bonus for bot
    };

    console.log("NewTurn:", JSON.stringify(newTurn, null, 2));

    dispatch(playNewTurn(newTurn));
  };

  return { playWorderbotTurn };
};

export default useWorderbot;
