import { StyleSheet, TextStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { RESULT_WORD_FONT_SIZE } from "../../components/TurnListItem/TurnListItem.styles";

interface Styles {
  startingWord: TextStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    startingWord: {
      alignSelf: "center",
      fontSize: RESULT_WORD_FONT_SIZE,
      minHeight: RESULT_WORD_FONT_SIZE * 2.5,
      color: theme.colors.secondary,
    },
  });
};
