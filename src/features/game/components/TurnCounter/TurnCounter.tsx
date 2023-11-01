import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TurnCounter.styles";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { TURNS_PER_GAME } from "../../constants";

export type Props = {
  isPlayer?: boolean;
};

// the vertically stacked dots indicting the current turn
const TurnCounter = ({ isPlayer }: Props) => {
  const styles = useStyles(createStyles);
  const { turns, isPlayerFirst } = useAppSelector((state) => state.game);

  // the current active turn number
  const turnNumber = Math.min(TURNS_PER_GAME, turns.length + 1);

  // the given player's turn count
  const count =
    (isPlayerFirst && isPlayer) || (!isPlayerFirst && !isPlayer)
      ? Math.floor(turnNumber * 0.5) + 1
      : Math.floor(turnNumber * 0.5);

  // to render a single dot
  const dot = (i: number) => <View key={i} style={styles.dot} />;

  // the dots array
  let dots: JSX.Element[] = [];
  for (let i = 0; i < count; i++) {
    dots.push(dot(i));
  }

  return <View style={styles.container}>{dots}</View>;
};

export default TurnCounter;
