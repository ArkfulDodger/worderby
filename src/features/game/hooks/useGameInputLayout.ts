import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

// tracks state and generates callbacks related to updating game text input layout
const useGameInputLayout = () => {
  // the height of the text, including padding
  const [textHeight, setTextHeight] = useState<number>();
  const onTextHeightLayout = (e: LayoutChangeEvent) =>
    setTextHeight(e.nativeEvent.layout.height);

  // whether the text has rendered to the screen yet
  const [hasRendered, setHasRendered] = useState(false);
  const onComponentRender = () => {
    if (!hasRendered) setHasRendered(true);
  };

  return { textHeight, onTextHeightLayout, hasRendered, onComponentRender };
};

export default useGameInputLayout;
