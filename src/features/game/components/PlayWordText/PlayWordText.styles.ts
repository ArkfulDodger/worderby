import { TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface Styles {
  stolenLetters: (size: number) => TextStyle;
  playWord: (split?: boolean) => ViewStyle;
  stolenContainer: (isSplit: boolean) => ViewStyle;
  inputContainer: (isSplit: boolean) => ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => ({
  playWord: (split?: boolean) => ({
    flexDirection: split ? "column" : "row",
  }),
  stolenLetters: (size: number) => ({
    fontSize: size,
    color: theme.colors.player,
  }),
  stolenContainer: (isSplit) => ({
    alignSelf: isSplit ? "flex-start" : "center",
  }),
  inputContainer: (isSplit) => ({
    alignSelf: isSplit ? "flex-end" : "center",
  }),
});
