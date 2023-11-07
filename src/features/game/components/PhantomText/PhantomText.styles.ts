import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  currentText: TextStyle;
  sizeUpText: TextStyle;
  idealText: TextStyle;
}

export const createStyles = (
  theme: AppTheme,
  {
    width,
    fontSize,
    idealFontSize,
  }: { width: number; fontSize: number; idealFontSize: number }
): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      position: "absolute",
      backgroundColor: "transparent",
      width: width,
      alignItems: "center",
    },
    text: {
      position: "absolute",
      color: "transparent",
      opacity: 0.3,
    },
    currentText: {
      fontSize: fontSize,
    },
    sizeUpText: {
      fontSize: fontSize + 1,
    },
    idealText: {
      fontSize: idealFontSize,
    },
  });
};
