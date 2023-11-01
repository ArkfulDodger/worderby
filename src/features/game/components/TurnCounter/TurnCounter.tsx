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

  // determine if it is this player's turn
  const isActivePlayer =
    turns.length < TURNS_PER_GAME && // if there are turns remaining
    (turns.length % 2 === 0) === (isPlayerFirst === !!isPlayer); // match odd/even turns to player order

  // dot renderer
  const dot = (i: number, active?: boolean) => (
    <View key={i} style={styles.dot(active)} />
  );

  // render regular dots for this player's completed turns
  let dots: JSX.Element[] = [];
  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];
    if (turn.isPlayerWord === !!isPlayer) {
      dots.push(dot(i));
    }
  }

  // render the active dot for the active player
  if (isActivePlayer) {
    dots.push(dot(turns.length, true));
  }

  return <View style={styles.container}>{dots}</View>;
};

export default TurnCounter;
