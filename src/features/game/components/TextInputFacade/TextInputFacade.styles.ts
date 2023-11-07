import { PixelRatio, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  text: TextStyle;
}

interface DynamicStyles {
  underline: (offset: number) => ViewStyle;
  caret: (height?: number) => ViewStyle;
  mockInputContainer: (height?: number) => ViewStyle;
}

interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme, fontSize: number): Styles => {
  const scaleFactor = PixelRatio.getFontScale();

  const staticStyles = StyleSheet.create<StaticStyles>({
    text: {
      fontSize: fontSize,
    },
  });

  const dynamicStyles: DynamicStyles = {
    mockInputContainer: (height) => ({
      minWidth: fontSize * scaleFactor * 0.6,
      height: height,
      flexDirection: "row",
    }),
    underline: (offset) => ({
      zIndex: -1,
      position: "absolute",
      borderBottomColor: theme.colors.text,
      borderBottomWidth: 1 * scaleFactor,
      left: 0,
      right: 0,
      bottom: offset - fontSize * 0.1,
    }),
    caret: (height) => ({
      position: "absolute",
      height: height,
      opacity: height ? 1 : 0,
      borderRightColor: theme.colors.outline,
      borderRightWidth: 2 * scaleFactor,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
