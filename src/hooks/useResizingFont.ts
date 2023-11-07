import { useEffect, useState } from "react";
import { NativeSyntheticEvent, TextLayoutEventData } from "react-native";

type Props = {
  elastic?: boolean;
  minFontSize?: number;
  startingFontSize?: number;
};

// used to dynamically resize font so text will remain on a single line
const useResizingFont = ({
  elastic, // does the font continue to resize with changes after the initial resizing
  minFontSize = 0, // the smallest allowed font size
  startingFontSize = 14, // the initial font size to test
}: Props) => {
  const [fontSize, setFontSize] = useState(startingFontSize); // the currently active font size
  const [isFontSized, setIsFontSized] = useState(false); // has the text reached its target size
  const [isAtMin, setIsAtMin] = useState(minFontSize === startingFontSize); // the font size cannot be reduced further

  // establish if font size is at the minimum and can no longer shrink
  useEffect(() => {
    setIsAtMin(fontSize === minFontSize);
  }, [fontSize]);

  // onLayout for the Text element used to judge current line number
  const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    // do not continue to resize if font has reached its target and is not elastic
    if (isFontSized && !elastic) return;

    let lineNum = event.nativeEvent.lines.length;
    if (lineNum > 1 && fontSize > minFontSize) {
      // if text is rendering at more than one line and can still shrink, decrease font size
      setFontSize((prev) => Math.max(minFontSize, prev - 1));
    } else {
      // if text is rendering on a single line, set as sized
      setIsFontSized(true);
    }
  };

  // on Layout called on the Text element used to judge the line number at one size up
  // will increase the font size incrementally up to the starting font size
  const onSizeUpLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (!elastic || fontSize >= startingFontSize) return;

    let lineNum = event.nativeEvent.lines.length;
    if (lineNum === 1) {
      setFontSize((prev) => Math.min(startingFontSize, prev + 1));
    }
  };

  // onLayout called on a text element permanently rendering at the ideal font size
  // if text can be successfully rendered at one line, immediately change to starting size
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
