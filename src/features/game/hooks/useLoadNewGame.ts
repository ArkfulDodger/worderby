import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useWordList from "../../../hooks/useWordList";
import {
  GameState,
  loadGame,
  setIsLoading,
} from "../../../store/slices/gameSlice";
import { demoWorderbot } from "../demoGameData";
import { GameMode } from "../enums";
import {
  selectIsPlayerFirst,
  selectMode,
  selectRestrictions,
  selectStreakCount,
} from "../gameSelectors";

const useLoadNewGame = () => {
  const dispatch = useAppDispatch();
  const streakCount = useAppSelector(selectStreakCount);
  const isPlayerFirst = useAppSelector(selectIsPlayerFirst);
  const restrictions = useAppSelector(selectRestrictions);
  const mode = useAppSelector(selectMode);
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

  // load a new single player game
  // TODO: this is temporary until online mode is created
  const loadSinglePlayerGame = async (mode?: GameMode) => {
    dispatch(setIsLoading(true));

    const startingWord = await getRandomStartingWord();

    const newGame: GameState = {
      id: NaN,
      mode: mode || GameMode.Competitive,
      streakCount: 0,
      isSinglePlayer: true,
      isPlayerFirst: true,
      endType: undefined,
      opponent: demoWorderbot,
      startingWord: startingWord,
      turns: [],
      initialRestrictions: [],
      activeTurn: undefined,
      isLoading: false,
    };

    dispatch(loadGame(newGame));
  };

  // continue the game streak
  // TODO: this is temporary until online mode is created
  const continueSinglePlayerGame = async () => {
    dispatch(setIsLoading(true));

    const startingWord = await getRandomStartingWord();

    const newGame: GameState = {
      id: NaN,
      mode: mode,
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

  return { continueDemoGame, loadSinglePlayerGame, continueSinglePlayerGame };
};

export default useLoadNewGame;
