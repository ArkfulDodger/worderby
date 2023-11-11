import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TimerBlock.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectTimerCount,
  selectStartTime,
  selectIsTimerInUse,
} from "../../gameSelectors";
import { useEffect } from "react";
import useTimer from "../../hooks/useTimer";

type Props = {};

// the header block which displays the timer or non-timer display
const TimerBlock = ({}: Props) => {
  const styles = useStyles(createStyles);
  const count = useAppSelector(selectTimerCount);
  const startTime = useAppSelector(selectStartTime);
  const isTimerInUse = useAppSelector(selectIsTimerInUse);
  const { startTimer } = useTimer();

  // when a new start time is set, start the timer
  // will not start a new timer if one is already in effect
  useEffect(() => {
    if (isTimerInUse && startTime) startTimer();
  }, [startTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{isTimerInUse ? count : "W"}</Text>
    </View>
  );
};

export default TimerBlock;
