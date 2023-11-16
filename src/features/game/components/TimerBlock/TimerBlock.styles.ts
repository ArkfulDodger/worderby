import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { fontScaled } from "../../../../utils/helpers";

interface Styles {
  container: ViewStyle;
  counter: TextStyle;
  timerCircle: ViewStyle;
}

export const TIMER_SIZE = fontScaled(50);

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      backgroundColor: theme.colors.inverseOnSurface,
      width: TIMER_SIZE,
      height: TIMER_SIZE,
      borderRadius: TIMER_SIZE * 0.5,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 0,
      borderColor: "black",
      overflow: "hidden",
    },
    counter: {
      fontSize: 26,
      color: theme.colors.text,
      fontWeight: "bold",
    },
    timerCircle: {
      position: "absolute",
    },
  });
};
