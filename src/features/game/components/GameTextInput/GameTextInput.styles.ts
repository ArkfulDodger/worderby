import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  input: TextStyle;
  invisible: TextStyle;
}

interface DynamicStyles {
  underline: (offset: number) => ViewStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme, fontSize: number): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    input: {
      fontSize: fontSize,
      minWidth: fontSize * 0.6,
    },
    invisible: {
      position: "absolute",
      opacity: 0,
    },
  });

  const dynamicStyles: DynamicStyles = {
    underline: (offset) => ({
      zIndex: -1,
      position: "absolute",
      borderBottomColor: theme.colors.text,
      borderBottomWidth: StyleSheet.hairlineWidth,
      left: 0,
      right: 0,
      bottom: offset - fontSize * 0.1,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
