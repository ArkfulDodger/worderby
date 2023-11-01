import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

export interface Styles {
  container: ViewStyle;
  dot: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  const size = 8;

  return StyleSheet.create<Styles>({
    container: {
      flexDirection: "column-reverse",
      rowGap: 3,
      width: size,
    },
    dot: {
      backgroundColor: "#00000088",
      width: size,
      height: size,
      borderRadius: size * 0.5,
    },
  });
};
