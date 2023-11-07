import { useEffect, useState } from "react";

// a timeout which will automatically clear itself if called subsequent times
const useSelfReplacingTimeout = () => {
  const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();

  // ensure timeout is cleared if unmounted
  useEffect(() => {
    return () => {
      clearTimeout(timeoutState);
    };
  }, []);

  // callback used to clear the previous timeout and set the new one
  const setSelfReplacingTimeout = (
    callback: () => void,
    ms?: number | undefined
  ) => {
    clearTimeout(timeoutState);
    const newTimeout = setTimeout(callback, ms);
    setTimeoutState(newTimeout);
  };

  return setSelfReplacingTimeout;
};

export default useSelfReplacingTimeout;
