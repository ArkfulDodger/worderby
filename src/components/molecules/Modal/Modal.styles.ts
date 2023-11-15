import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../utils/types";

interface Styles {
  modal: ViewStyle;
  container: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    modal: {
      margin: 30,
    },
    container: {
      backgroundColor: theme.colors.background,
      padding: 30,
      borderRadius: 20,
      alignItems: "stretch",
    },
  });
};
