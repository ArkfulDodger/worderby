import useStyles from "../../../../hooks/useStyles";
import { TIMER_SIZE, createStyles } from "./TimerBlock.styles";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectTimerCount,
  selectStartTime,
  selectIsTimerInUse,
} from "../../gameSelectors";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useEffect } from "react";
import useAnimatedTimer from "../../hooks/useAnimatedTimer";
import CircularProgressBar from "../../../../components/molecules/CircularProgressBar";
import { selectIsAppActive } from "../../../../slices/systemSlice";

type Props = {};

// the header block which displays the timer or non-timer display
const TimerBlock = ({}: Props) => {
  const styles = useStyles(createStyles);
  const count = useAppSelector(selectTimerCount);
  const startTime = useAppSelector(selectStartTime);
  const isTimerInUse = useAppSelector(selectIsTimerInUse);
  const isAppActive = useAppSelector(selectIsAppActive);
  const { progress, startTimer, timerValue } = useAnimatedTimer();

  // when a new start time is set, start the timer
  // restarts the timer when app is refocused (catching up to present)
  useEffect(() => {
    if (isTimerInUse && isAppActive && startTime) {
      startTimer();
    }
  }, [startTime, isAppActive]);

  return (
    <View style={[styles.container]}>
      {isTimerInUse && (
        <CircularProgressBar
          radius={TIMER_SIZE * 0.5}
          progress={progress}
          timer={timerValue}
          style={styles.timerCircle}
        />
      )}
      <Text style={styles.counter}>{isTimerInUse ? count : "W"}</Text>
    </View>
  );
};

export default TimerBlock;
