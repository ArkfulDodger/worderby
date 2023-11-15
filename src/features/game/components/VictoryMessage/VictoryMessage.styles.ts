import { StyleSheet, TextStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { GameResult } from "../../enums";

interface Styles {
  text: TextStyle;
  opponent: TextStyle;
}

export const createStyles = (theme: AppTheme, result: GameResult): Styles => {
  return StyleSheet.create<Styles>({
    text: {
      alignSelf: "center",
      textAlign: "center",
      margin: 30,
      fontSize: 40,
      color: result === GameResult.Win ? "magenta" : theme.colors.text,
      fontWeight: "bold",
    },
    opponent: {
      color: "#c18617",
      fontWeight: undefined,
    },
  });
};
