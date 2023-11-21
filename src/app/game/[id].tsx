import { useEffect } from "react";
import GamePage from "../../features/game/screens/GamePage";
import useLoadNewGame from "../../features/game/hooks/useLoadNewGame";
import { useLocalSearchParams } from "expo-router";

type Params = {
  id: string; // number
};

// loads a game of a specific id
// TODO: have actually load from id, not by mode
const gameById = () => {
  const { loadSinglePlayerGame } = useLoadNewGame();
  const params = useLocalSearchParams<Params>();

  useEffect(() => {
    console.log("Game Mode:", params.id);
    loadSinglePlayerGame(parseInt(params.id));
  }, []);

  return <GamePage />;
};

export default gameById;
