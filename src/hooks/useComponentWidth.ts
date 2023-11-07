import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

// track the width of a component in state, subtracting padding if desired
const useComponentWidth = (padding?: number) => {
  const [width, setWidth] = useState<number>();

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width - (padding || 0) * 2);
  };

  return { width, onLayout };
};

export default useComponentWidth;
