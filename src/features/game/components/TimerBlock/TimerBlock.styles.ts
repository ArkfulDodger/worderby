import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

export interface Styles {
  container: ViewStyle;
  counter: TextStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  const size = 50;

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
