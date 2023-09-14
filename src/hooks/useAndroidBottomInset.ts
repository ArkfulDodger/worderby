import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// for correcting an android issue where the bottom inset is initially logged,
// then set to zero, but is needed to correct an offset by that amount for
// KeyboardAwareViews which have components placed beneath them on the screen
// (as is the case with the Game Page footer)
const useAndroidBottomInset = () => {
  const insets = useSafeAreaInsets();
  const nonZeroBottomInset = useRef<number>();
  useEffect(() => {
    if (insets.bottom !== 0) nonZeroBottomInset.current = insets.bottom;
  }, [insets.bottom]);

  const androidBottomInset =
    Platform.OS === "ios"
      ? undefined
      : nonZeroBottomInset?.current &&
        insets.bottom !== nonZeroBottomInset.current
      ? -nonZeroBottomInset.current
      : 0;

  return androidBottomInset;
};

export default useAndroidBottomInset;
