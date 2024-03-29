import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  outerHeaderContainer: ViewStyle;
  innerHeaderContainer: ViewStyle;
  headerContent: ViewStyle;
  scoreContainer: ViewStyle;
  centerContainer: ViewStyle;
  worderbyteContainer: ViewStyle;
  worderbyte: TextStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<Styles>({
    outerHeaderContainer: {
      backgroundColor: "#DDDDDD",
    },
    innerHeaderContainer: {
      backgroundColor: "#EEEEEE",
    },
    headerContent: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingBottom: 5,
    },
    centerContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      columnGap: 4,
      marginHorizontal: 5,
    },
    scoreContainer: {
      flex: 1,
    },
    worderbyteContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
      paddingVertical: 4,
      backgroundColor: theme.colors.primary,
    },
    worderbyte: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.colors.inverseOnSurface,
    },
  });

  return staticStyles;
};
