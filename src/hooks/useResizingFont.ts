import { useState } from "react";
import { NativeSyntheticEvent, TextLayoutEventData } from "react-native";

type Props = {
  minFontSize?: number;
  startingFontSize?: number;
};

const useResizingFont = ({ minFontSize = 0, startingFontSize = 14 }: Props) => {
  const [fontSize, setFontSize] = useState(startingFontSize);
  const [isFontSized, setIsFontSized] = useState(false);

  const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (isFontSized) return;

    let lineNum = event.nativeEvent.lines.length;
    if (lineNum > 1 && fontSize > minFontSize) {
      setFontSize((prev) => Math.max(minFontSize, prev - 1));
    } else {
      setIsFontSized(true);
    }
  };

  return {
    isFontSized,
    fontSize,
    onTextLayout,
  };
};

export default useResizingFont;
