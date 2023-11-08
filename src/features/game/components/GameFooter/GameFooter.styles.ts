import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  footerContainer: ViewStyle;
  footerContent: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<Styles>({
    footerContainer: {
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    footerContent: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingVertical: 5,
    },
  });

  return staticStyles;
};
