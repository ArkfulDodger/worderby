import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { EdgeInsets } from "react-native-safe-area-context";

export interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  centerContainer: ViewStyle;
}

export const createStyles = (theme: AppTheme, insets: EdgeInsets): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    header: {
      paddingTop: insets.top,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    centerContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      columnGap: 4,
    },
  });
};
