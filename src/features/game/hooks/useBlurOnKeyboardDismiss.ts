import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setInputFocus } from "../../../slices/gameSlice";
import { Keyboard } from "react-native";

// ensures the game text input is blurred when the keyboard is dismissed
const useBlurOnKeyboardDismiss = () => {
  const dispatch = useAppDispatch();

  // blur text input if currently focused
  const blurTextInput = () => {
    dispatch(setInputFocus(false));
  };

  // Add event listener for the keyboard
  useEffect(() => {
    // Subscribe to the keyboard dismiss event
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      blurTextInput
    );

    return () => {
      // Remove the event listener when the component unmounts
      keyboardDidHideListener.remove();
    };
  }, []);

  return;
};

export default useBlurOnKeyboardDismiss;
