import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
  blocks: ViewStyle;
  divider: ViewStyle;
  row: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      rowGap: 20,
    },
    button: {
      marginHorizontal: 30,
    },
    text: {
      textAlign: "center",
    },
    blocks: {
      rowGap: 10,
    },
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
