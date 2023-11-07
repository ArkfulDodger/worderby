import { PixelRatio, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import metrics from "../../../../utils/metrics";

interface StaticStyles {
  text: TextStyle;
  hiddenInput: TextStyle;
  hiddenOffscreen: TextStyle;
  multiline: TextStyle;
  multilineIosPadding: TextStyle;
}

interface DynamicStyles {
  container: (isSplit: boolean) => ViewStyle;
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
    hiddenInput: {
      position: "absolute",
      color: "transparent",
    },
    hiddenOffscreen: {
      position: "absolute",
      transform: [{ translateX: metrics.screenWidth }],
      opacity: 0,
    },
    multilineIosPadding: {
      padding: 5,
      paddingBottom: 10,
      paddingTop: 14,
    },
    multiline: {
      textAlign: "right",
      textAlignVertical: "top",
      textDecorationLine: "underline",
    },
  });

  const dynamicStyles: DynamicStyles = {
    container: (isSplit) => ({
      alignSelf: isSplit ? "flex-end" : "center",
    }),
    mockInputContainer: (height) => ({
      minWidth: fontSize * scaleFactor * 0.6,
      height: height,
      flexDirection: "row",
    }),
    underline: (offset) => ({
      zIndex: -1,
      position: "absolute",
      borderBottomColor: theme.colors.text,
      // borderBottomWidth: StyleSheet.hairlineWidth,
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
