import { useEffect, useState } from "react";
import { NativeSyntheticEvent, TextLayoutEventData } from "react-native";

type Props = {
  elastic?: boolean;
  minFontSize?: number;
  startingFontSize?: number;
};

// used to dynamically resize font so text will remain on a single line
const useResizingFont = ({
  elastic,
  minFontSize = 0,
  startingFontSize = 14,
}: Props) => {
  const [fontSize, setFontSize] = useState(startingFontSize);
  const [isFontSized, setIsFontSized] = useState(false);
  const [isAtMin, setIsAtMin] = useState(minFontSize === startingFontSize);

  // establish if font size is at the minimum and can no longer shrink
  useEffect(() => {
    setIsAtMin(fontSize === minFontSize);
  }, [fontSize]);

  // onLayout for the Text element used to judge current line number
  const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (isFontSized && !elastic) return;

    let lineNum = event.nativeEvent.lines.length;
    if (lineNum > 1 && fontSize > minFontSize) {
      setFontSize((prev) => Math.max(minFontSize, prev - 1));
    } else {
      setIsFontSized(true);
    }
  };

  // on Layout called on the Text element used to judge the line number at one size up
  const onSizeUpLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (fontSize >= startingFontSize) return;

    let lineNum = event.nativeEvent.lines.length;
    if (lineNum === 1) {
      setFontSize((prev) => Math.min(startingFontSize, prev + 1));
    }
  };

  const onIdealSizeLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>
  ) => {
    if (fontSize === startingFontSize) return;

    let lineNum = event.nativeEvent.lines.length;
    if (lineNum === 1) {
      setFontSize(startingFontSize);
    }
  };

  return {
    isFontSized,
    isAtMin,
    fontSize,
    onTextLayout,
    onSizeUpLayout,
    onIdealSizeLayout,
  };
};

export default useResizingFont;
