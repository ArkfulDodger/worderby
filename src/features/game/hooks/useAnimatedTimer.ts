import {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MIN_TIMER, TIMER_COUNT, TIMER_MS_PER_COUNT } from "../constants";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setTimerCount } from "../../../slices/gameSlice";
import { selectRoundPhase, selectStartTime } from "../gameSelectors";
import { calculateTimeDifferenceInMilliseconds } from "../../../utils/helpers";
import { RoundPhase } from "../enums";

const useAnimatedTimer = () => {
  const dispatch = useAppDispatch();
  const startTime = useAppSelector(selectStartTime);
  const phase = useAppSelector(selectRoundPhase);

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
    // get the milliseconds which have passed since the turn began
    const timeSinceStart = startTime
      ? calculateTimeDifferenceInMilliseconds(startTime) || 0
      : 0;

    // get the floating point counts (not ms) remaining on the timer
    const initialValue = Math.min(
      TIMER_COUNT,
      Math.max(MIN_TIMER, TIMER_COUNT - timeSinceStart / TIMER_MS_PER_COUNT)
    );

    // stop any active animation on the timer value
    cancelAnimation(timerValue);

    // set the timer to the initial value
    timerValue.value = initialValue;
    dispatch(setTimerCount(Math.ceil(initialValue)));

    // start animating the value to the minimum over the remaining time on the timer
    timerValue.value = withTiming(MIN_TIMER, {
      duration: (initialValue - MIN_TIMER) * TIMER_MS_PER_COUNT,
      easing: Easing.linear,
    });
  }, [startTime]);

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

  // reset timerValue when phase progresses past play phase
  useEffect(() => {
    // if not the player turn, cancel active animations and reset the timer
    if (phase !== RoundPhase.PlayerTurn) {
      cancelAnimation(timerValue);
      timerValue.value = TIMER_COUNT;
    }

    // cancel any active animation on component dismount
    return () => cancelAnimation(timerValue);
  }, [phase]);

  return { progress, startTimer, timerValue };
};

export default useAnimatedTimer;
