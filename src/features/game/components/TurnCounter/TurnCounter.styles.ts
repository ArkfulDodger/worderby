import { PixelRatio, StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
}

interface DynamicStyles {
  dot: (current?: boolean) => ViewStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const scaleFactor = PixelRatio.getFontScale();
  const size = 8 * scaleFactor;

  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      flexDirection: "column-reverse",
      rowGap: 3,
      width: size,
    },
  });

  const dynamicStyles: DynamicStyles = {
    dot: (current) => ({
      backgroundColor: current ? "red" : "#00000088",
      width: size,
      height: size,
      borderRadius: size * 0.5,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
