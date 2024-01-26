import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  container: ViewStyle;
  invisible: TextStyle;
  stolen: TextStyle;
  splitLeft: TextStyle;
  splitRight: TextStyle;
  text: TextStyle;
}

interface Vars {
  isSplit: boolean;
  size: number;
  display: boolean;
}
export const createStyles = (
  theme: AppTheme,
  { isSplit, size, display }: Vars
): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      alignSelf: "center",
      justifyContent: "center",
      flexDirection: isSplit ? "column" : "row",
    },
    invisible: {
      position: "absolute",
      color: "transparent",
    },
    stolen: {
      color: theme.colors.player,
    },
    splitLeft: {
      textAlign: isSplit ? "left" : "center",
    },
    splitRight: {
      textAlign: isSplit ? "right" : "center",
    },
    text: {
      fontSize: size,
      color: display ? theme.colors.text : "transparent",
      textAlign: "center",
    },
  });
};
