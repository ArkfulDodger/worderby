import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { GameState, loadGame } from "../../../slices/gameSlice";
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

  // continue the game streak
  const continueDemoGame = () => {
    console.log("continue fired!");
    const newGame: GameState = {
      id: NaN,
      mode: GameMode.Demo,
      streakCount: streakCount + 1,
      isSinglePlayer: true,
      isPlayerFirst: !isPlayerFirst,
      endType: undefined,
      opponent: demoWorderbot,
      startingWord: "word", // TODO: select random word
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
