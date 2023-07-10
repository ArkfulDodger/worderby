import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

export interface Styles {
  container: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "space-around",
    },
  });
};
