import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  container: ViewStyle;
  keyboardAwareContainer: ViewStyle;
  frameContainer: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    keyboardAwareContainer: {
      flex: 1,
    },
    frameContainer: {
      flex: 1,
    },
  });

  return staticStyles;
};
