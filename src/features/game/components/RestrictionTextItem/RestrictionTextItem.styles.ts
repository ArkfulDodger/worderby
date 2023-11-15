import { TextStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

export interface Styles {
  endings: (n: number) => TextStyle;
}

export const createStyles = (theme: AppTheme): Styles => ({
  endings: (n) => ({
    color: n === Infinity ? "red" : theme.colors.text,
    fontWeight: n > 1 ? "bold" : "normal",
    opacity: n === 0 ? 0.4 : 1,
  }),
});
