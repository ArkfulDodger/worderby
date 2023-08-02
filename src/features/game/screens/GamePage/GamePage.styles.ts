import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { EdgeInsets } from "react-native-safe-area-context";

export interface Styles {
  container: ViewStyle;
  headerContainer: ViewStyle;
  header: ViewStyle;
  centerContainer: ViewStyle;
  worderbyteContainer: ViewStyle;
  worderbyte: TextStyle;
}

export const createStyles = (theme: AppTheme, insets: EdgeInsets): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    headerContainer: {
      //
    },
    header: {
      paddingTop: insets.top,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingBottom: 5,
      backgroundColor: "magenta",
    },
    centerContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      columnGap: 4,
    },
    worderbyteContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
      paddingVertical: 4,
    },
    worderbyte: {
      fontSize: 15,
    },
  });
};
