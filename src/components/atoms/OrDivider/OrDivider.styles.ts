import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../utils/types";

interface Styles {
  divider: ViewStyle;
  row: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    divider: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
    },
  });
};
