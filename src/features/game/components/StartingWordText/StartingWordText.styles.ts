import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

interface Vars {
  size: number;
  display: boolean;
}

export const createStyles = (
  theme: AppTheme,
  { size, display }: Vars
): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      alignSelf: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: size,
      color: display ? theme.colors.text : "transparent",
      textAlign: "center",
    },
  });
};
