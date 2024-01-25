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
      color: result === GameResult.Win ? theme.colors.player : theme.colors.text,
      fontWeight: "bold",
    },
    opponent: {
      alignSelf: undefined,
      textAlign: undefined,
      margin: undefined,
      fontSize: undefined,
      color: "#c18617",
      fontWeight: undefined,
    },
  });
};
