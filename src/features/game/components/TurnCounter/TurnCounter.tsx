import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TurnCounter.styles";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectIsActivePlayerTurn,
  selectIsPlayerTurn,
  selectTurns,
} from "../../gameSelectors";

export type Props = {
  isPlayer?: boolean;
};

// the vertically stacked dots indicting the current turn
const TurnCounter = ({ isPlayer }: Props) => {
  const styles = useStyles(createStyles);
  const turns = useAppSelector(selectTurns);
  const isActivePlayerTurn = useAppSelector(selectIsActivePlayerTurn);
  const isOpponentsTurn = !useAppSelector(selectIsPlayerTurn);

  // dot renderer
  const dot = (i: number, active?: boolean) => (
    <View key={i} style={styles.dot(active)} />
  );

  // render regular dots for this player's completed turns
  let dots: JSX.Element[] = [];
  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];
    if (turn.isPlayer === !!isPlayer) {
      dots.push(dot(i));
    }
  }

  // render the active dot for the active player
  if (isPlayer ? isActivePlayerTurn : isOpponentsTurn) {
    dots.push(dot(turns.length, true));
  }

  return <View style={styles.container}>{dots}</View>;
};

export default TurnCounter;
