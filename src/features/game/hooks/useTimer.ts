import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectActiveTurn, selectTimerCount } from "../gameSelectors";
import { MIN_TIMER, TIMER_MS_PER_COUNT } from "../constants";
import { decrementTimerCount } from "../../../slices/gameSlice";

// initiate and stop countdown for the active turn timer
const useTimer = () => {
  const dispatch = useAppDispatch();
  const activeTurn = useAppSelector(selectActiveTurn);
  const timerCount = useAppSelector(selectTimerCount);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();

  // kill any active interval and clear the interval state
  const stopTimer = (id?: NodeJS.Timer) => {
    let interval = id || timerInterval;

    if (interval) {
      clearInterval(interval);
      setTimerInterval(undefined);
    }
  };

  // start the timer for the countdown
  const startTimer = () => {
    // ignore call if timer already running
    if (timerInterval) return;

    const id = setInterval(() => {
      if (timerCount !== undefined && timerCount > MIN_TIMER)
        dispatch(decrementTimerCount());
      else stopTimer(id);
    }, TIMER_MS_PER_COUNT);

    setTimerInterval(id);
  };

  // clear the timer when the phase leaves the player turn or when the component is unmounted
  useEffect(() => {
    if (timerInterval && !activeTurn) stopTimer();

    return () => {
      if (timerInterval) stopTimer();
    };
  }, [!!activeTurn]);

  return { startTimer };
};

export default useTimer;
