import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { fontScaled } from "../../../../utils/helpers";

interface StaticStyles {
  container: ViewStyle;
}

interface DynamicStyles {
  endings: (n: number) => TextStyle;
}

const FONT_SIZE = 16;
export const RESTRICTION_ITEM_HEIGHT = fontScaled(FONT_SIZE * 1.5);

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      height: RESTRICTION_ITEM_HEIGHT,
      justifyContent: "center",
    },
  });

  const dynamicStyles: DynamicStyles = {
    endings: (matchingChars) => ({
      fontSize: FONT_SIZE,
      color: matchingChars === Infinity ? theme.colors.alert : theme.colors.text, // Infinity is an exact match
      fontWeight: matchingChars > 1 ? "bold" : "normal",
      opacity: matchingChars === 0 ? 0.4 : 1,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
