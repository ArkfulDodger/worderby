import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TimerBlock.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectTimerCount, selectMode } from "../../gameSelectors";
import { GameMode } from "../../enums";
import { useMemo } from "react";

export type Props = {};

// the header block which displays the timer or non-timer display
const TimerBlock = ({}: Props) => {
  const styles = useStyles(createStyles);
  const mode = useAppSelector(selectMode);
  const count = useAppSelector(selectTimerCount);

  // TODO: phase also factors into timer use
  const isTimerUsed = useMemo(
    () => mode === GameMode.Competitive && count !== undefined,
    [mode, count]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{isTimerUsed ? count : "∞"}</Text>
    </View>
  );
};

export default TimerBlock;
