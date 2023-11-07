import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../utils/types";

interface Styles {
  fill: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    fill: {
      flex: 1,
    },
  });
};
