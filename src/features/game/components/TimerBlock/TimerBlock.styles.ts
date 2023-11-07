import { PixelRatio, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  container: ViewStyle;
  counter: TextStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  const scaleFactor = PixelRatio.getFontScale();
  const size = 50 * scaleFactor;

  return StyleSheet.create<Styles>({
    container: {
      backgroundColor: theme.colors.inverseOnSurface,
      width: size,
      height: size,
      borderRadius: size * 0.5,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "black",
    },
    counter: {
      fontSize: 26,
      color: theme.colors.text,
      fontWeight: "bold",
    },
  });
};
