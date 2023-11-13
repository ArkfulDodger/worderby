import { Circle, CircleProps, G, Svg } from "react-native-svg";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./CircularProgressBar.styles";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectIsTimerInUse,
  selectStartTime,
} from "../../../features/game/gameSelectors";
import { useCallback, useEffect } from "react";
import {
  MIN_TIMER,
  TIMER_COUNT,
  TIMER_MS_PER_COUNT,
} from "../../../features/game/constants";

type Props = {
  radius: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = ({ radius }: Props) => {
  const styles = useStyles(createStyles);

  const startTime = useAppSelector(selectStartTime);
  const isTimerInUse = useAppSelector(selectIsTimerInUse);

  const progress = useSharedValue(1);

  const R = radius - 3;
  const circumference = 2 * Math.PI * R;

  const animatedProps = useAnimatedProps<CircleProps>(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
    // strokeDasharray: [circumference / 2, circumference],
  }));

  const startAnimation = useCallback(() => {
    progress.value = withTiming(0, {
      duration: (TIMER_COUNT - MIN_TIMER) * TIMER_MS_PER_COUNT,
      easing: Easing.linear,
    });
  }, []);

  // when a new start time is set, start the timer
  // will not start a new timer if one is already in effect
  useEffect(() => {
    if (isTimerInUse && startTime) {
      startAnimation();
    }
  }, [startTime]);

  return (
    <Svg height={radius * 2} width={radius * 2}>
      <G rotation="-90" origin={`${radius},${radius}`}>
        <Circle
          cx={radius}
          cy={radius}
          r={R}
          stroke="#e0e0e0"
          strokeWidth={6}
          fill="transparent"
        />
        <AnimatedCircle
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap={"butt"}
          // strokeDasharray={[progressValue, circumference]}
          cx={radius}
          cy={radius}
          r={R}
          stroke="#42a5f5"
          strokeWidth={6}
          fill="transparent"
        />
      </G>
    </Svg>
  );
};

export default CircularProgressBar;
