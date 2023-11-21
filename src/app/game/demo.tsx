import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loadDemoGame } from "../../store/slices/gameSlice";
import GamePage from "../../features/game/screens/GamePage";

type Props = {};

// the demo screen route
// loads a new demo game into the game state on open
const demo = ({}: Props) => {
  const dispatch = useAppDispatch();

  // TODO: put in logic to confirm the demo game has loaded

  useEffect(() => {
    dispatch(loadDemoGame());
  }, []);

  return <GamePage />;
};

export default demo;
