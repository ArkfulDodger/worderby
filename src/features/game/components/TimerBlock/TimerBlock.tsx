import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TimerBlock.styles";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectTimerCount,
  selectStartTime,
  selectIsTimerInUse,
} from "../../gameSelectors";
import Animated from "react-native-reanimated";
import CircularProgressBar from "../../../../components/molecules/CircularProgressBar";
import { PixelRatio, View } from "react-native";
import { Text } from "react-native-paper";
import { useEffect } from "react";
import useAnimatedTimer from "../../hooks/useAnimatedTimer";

type Props = {};

// the header block which displays the timer or non-timer display
const TimerBlock = ({}: Props) => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectTimerCount);
  const startTime = useAppSelector(selectStartTime);
  const isTimerInUse = useAppSelector(selectIsTimerInUse);
  const scaleFactor = PixelRatio.getFontScale();
  const size = 50 * scaleFactor;
  const { progress, startTimer, timerValue } = useAnimatedTimer();

  // when a new start time is set, start the timer
  // will not start a new timer if one is already in effect
  useEffect(() => {
    if (isTimerInUse && startTime) {
      startTimer();
    }
  }, [startTime]);

  return (
    <Animated.View style={[styles.container]}>
      {isTimerInUse && (
        <View style={{ position: "absolute" }}>
          <CircularProgressBar
            radius={size * 0.5 - 1}
            progress={progress}
            timer={timerValue}
          />
        </View>
      )}
      <Text style={styles.counter}>{isTimerInUse ? count : "W"}</Text>
    </Animated.View>
  );
};

export default TimerBlock;
