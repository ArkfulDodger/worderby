import { Keyboard } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setInputFocus } from "../../../reducers/gameReducer";
import { selectInputFocus } from "../gameSelectors";
import { useEffect } from "react";

// ensures the game text input is blurred when the keyboard is dismissed
const useBlurOnKeyboardDismiss = () => {
  const inputFocused = useAppSelector(selectInputFocus);
  const dispatch = useAppDispatch();

  // blur text input if currently focused
  const blurTextInput = () => {
    console.log("blur called");
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
