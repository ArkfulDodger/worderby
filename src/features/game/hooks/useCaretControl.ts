import { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectInputFocus } from "../gameSelectors";

// controls display of manual text input caret
const useCaretControl = () => {
  const inputFocused = useAppSelector(selectInputFocus);

  // whether to show the caret
  const [caretIndex, setCaretIndex] = useState(0);
  const [isCaretVisible, setIsCaretVisible] = useState(false);
  const showCaret = () => setIsCaretVisible(true);
  const hideCaret = () => setIsCaretVisible(false);

  // display caret if the input is focused
  useEffect(() => {
    inputFocused ? showCaret() : hideCaret();
  }, [inputFocused]);

  // how to handle the caret when input selection changes
  const handleSelectionChange = (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => {
    let isCaretSinglePosition =
      e.nativeEvent.selection.start === e.nativeEvent.selection.end;

    if (isCaretSinglePosition) {
      !isCaretVisible && showCaret();
      setCaretIndex(e.nativeEvent.selection.start);
    } else if (!isCaretSinglePosition && isCaretVisible) {
      hideCaret();
    }
  };

  return {
    caretIndex,
    isCaretVisible,
    handleSelectionChange,
  };
};

export default useCaretControl;
