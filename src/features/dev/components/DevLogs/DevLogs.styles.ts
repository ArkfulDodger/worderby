import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  frame: ViewStyle;
  scroll: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    frame: {
      height: 200,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
    },
    scroll: {
      rowGap: 10,
    },
  });
};
