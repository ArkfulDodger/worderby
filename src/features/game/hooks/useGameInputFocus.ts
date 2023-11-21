import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectInputFocus, selectIsWordSplit } from "../gameSelectors";
import { setInputFocus } from "../../../store/slices/gameSlice";

// control input focus between regular and multiline input field and focus state
const useGameInputFocus = () => {
  const dispatch = useAppDispatch();
  const inputFocused = useAppSelector(selectInputFocus);
  const multiline = useAppSelector(selectIsWordSplit);

  // refs
  const inputRef = useRef<TextInput>(null);
  const multilineInputRef = useRef<TextInput>(null);

  // state
  const [canFocus, setCanFocus] = useState(false);

  // focus the player text input
  const focusInput = () =>
    multiline && multilineInputRef.current
      ? multilineInputRef.current.focus()
      : inputRef.current?.focus();

  // blur the player's text input
  const blurInput = () =>
    multiline && multilineInputRef.current
      ? multilineInputRef.current.blur()
      : inputRef.current?.blur();

  // ensure inputs match the focus state
  const focusBlurWithState = () => {
    // select the input ref currently in use based on whether the word is split
    const activeInputRef = multiline ? multilineInputRef : inputRef;

    // focus or blur the input to match the current state
    if (!inputFocused && activeInputRef.current?.isFocused()) blurInput();
    else if (inputFocused && !activeInputRef.current?.isFocused())
      canFocus && focusInput();
  };

  // ensure state focus on input field focus
  const focusStateOnInputFocus = () => {
    if (canFocus && !inputFocused) dispatch(setInputFocus(true));
  };

  // ensure state blur if both input fields are blurred
  const blurStateOnFullInputBlur = () => {
    const bothInputsBlurred =
      !inputRef.current?.isFocused() && !multilineInputRef.current?.isFocused();
    if (inputFocused && bothInputsBlurred) dispatch(setInputFocus(false));
  };

  // enable input focus
  const enableFocus = () => {
    setCanFocus(true);
    setTimeout(() => {
      dispatch(setInputFocus(true));
    }, 1);
  };

  // when multiline or focus settings change, focus the appropriate input
  useEffect(() => {
    if (canFocus && inputFocused) focusBlurWithState();
  }, [multiline]);

  // when input focus state changes, focus/blur accordingly
  useEffect(() => {
    focusBlurWithState();
  }, [inputFocused]);

  return {
    inputRef,
    multilineInputRef,
    canFocus,
    enableFocus,
    focusStateOnInputFocus,
    blurStateOnFullInputBlur,
  };
};

export default useGameInputFocus;
