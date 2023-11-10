import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Turn, playNewTurn, setIsLoading } from "../../../slices/gameSlice";
import {
  selectCurrentTurnNumber,
  selectIsWorderbotTurn,
} from "../gameSelectors";

const DEMO_WORDERBOT_WORDS: { [i: number]: { word: string; pNum: number } } = {
  1: { word: "order", pNum: 3 },
  2: { word: "derby", pNum: 3 },
  3: { word: "byte", pNum: 2 },
  4: { word: "test", pNum: 2 },
  5: { word: "establish", pNum: 3 },
  6: { word: "ship", pNum: 2 },
};

// control the worderbot opponent
const useWorderbot = () => {
  const dispatch = useAppDispatch();
  const turnNumber = useAppSelector(selectCurrentTurnNumber);
  const isWorderbotTurn = useAppSelector(selectIsWorderbotTurn);

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

  const playWorderbotTurn = () => {
    dispatch(setIsLoading(true));

    const newTurn: Turn = {
      isPlayer: false,
      turnNumber: turnNumber,
      startedAt: new Date().toISOString(),
      playedAt: new Date().toISOString(),
      word: DEMO_WORDERBOT_WORDS[turnNumber].word,
      pNum: DEMO_WORDERBOT_WORDS[turnNumber].pNum,
    };

    dispatch(playNewTurn(newTurn));
  };

  return { playWorderbotTurn };
};

export default useWorderbot;
