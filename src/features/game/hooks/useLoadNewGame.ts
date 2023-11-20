import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useWordList from "../../../hooks/useWordList";
import { GameState, loadGame, setIsLoading } from "../../../slices/gameSlice";
import { demoWorderbot } from "../demoGameData";
import { GameMode } from "../enums";
import {
  selectIsPlayerFirst,
  selectRestrictions,
  selectStreakCount,
} from "../gameSelectors";

const useLoadNewGame = () => {
  const dispatch = useAppDispatch();
  const streakCount = useAppSelector(selectStreakCount);
  const isPlayerFirst = useAppSelector(selectIsPlayerFirst);
  const restrictions = useAppSelector(selectRestrictions);
  const { getRandomStartingWord } = useWordList();

  // continue the game streak
  const continueDemoGame = async () => {
    dispatch(setIsLoading(true));

    const startingWord = await getRandomStartingWord();

    const newGame: GameState = {
      id: NaN,
      mode: GameMode.Demo,
      streakCount: streakCount + 1,
      isSinglePlayer: true,
      isPlayerFirst: !isPlayerFirst,
      endType: undefined,
      opponent: demoWorderbot,
      startingWord: startingWord,
      turns: [],
      initialRestrictions: restrictions,
      activeTurn: undefined,
      isLoading: false,
    };

    dispatch(loadGame(newGame));
  };

  return { continueDemoGame };
};

export default useLoadNewGame;
