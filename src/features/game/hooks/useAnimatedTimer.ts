import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MIN_TIMER, TIMER_COUNT, TIMER_MS_PER_COUNT } from "../constants";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setTimerCount } from "../../../slices/gameSlice";
import { selectStartTime } from "../gameSelectors";

const useAnimatedTimer = () => {
  const dispatch = useAppDispatch();
  const startTime = useAppSelector(selectStartTime);

  // The precise animated count on the timer
  const timerValue = useSharedValue(TIMER_COUNT);

  // the progress (1.0 to 0.0) of the current count of the timer
  const progress = useDerivedValue(() => {
    const posVal = timerValue.value - MIN_TIMER;
    const decVal = Math.abs(Math.round((posVal % 1) * 10000) * 0.0001);
    return decVal;
  });

  // the current integer count of the timer (to display in UI text)
  const timerInt = useDerivedValue(() => Math.ceil(timerValue.value));

  // triggers the start of the timer and animation
  const startTimer = useCallback(() => {
    timerValue.value = withTiming(MIN_TIMER, {
      duration: (TIMER_COUNT - MIN_TIMER) * TIMER_MS_PER_COUNT,
      easing: Easing.linear,
    });
  }, []);

  // updated the timer in state to the passed number
  const updateTimer = (newTime: number) => {
    dispatch(setTimerCount(newTime));
  };

  // trigger an update of the timer whenever the animated timer int value changes
  useAnimatedReaction(
    () => timerInt.value,
    (newResult, oldResult) => {
      if (oldResult !== newResult) runOnJS(updateTimer)(newResult);
    }
  );

  return { progress, startTimer, timerValue };
};

export default useAnimatedTimer;
