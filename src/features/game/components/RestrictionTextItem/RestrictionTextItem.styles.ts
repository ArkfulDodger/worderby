import { PixelRatio, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
}

interface DynamicStyles {
  endings: (n: number) => TextStyle;
}

const scaleFactor = PixelRatio.getFontScale();
const FONT_SIZE = 16;
export const RESTRICTION_ITEM_HEIGHT = scaleFactor * (FONT_SIZE * 1.5);

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      height: RESTRICTION_ITEM_HEIGHT,
      justifyContent: "center",
    },
  });

  const dynamicStyles: DynamicStyles = {
    endings: (n) => ({
      fontSize: FONT_SIZE,
      color: n === Infinity ? "red" : theme.colors.text,
      fontWeight: n > 1 ? "bold" : "normal",
      opacity: n === 0 ? 0.4 : 1,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
