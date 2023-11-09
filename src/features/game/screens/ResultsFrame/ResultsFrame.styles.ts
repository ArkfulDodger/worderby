import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { RESULT_WORD_FONT_SIZE } from "../../components/TurnListItem/TurnListItem.styles";

interface Styles {
  container: ViewStyle;
  list: ViewStyle;
  startingWord: TextStyle;
  listContainer: ViewStyle;
}

export const createStyles = (theme: AppTheme): Styles => {
  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    list: {
      flex: 1,
    },
    startingWord: {
      alignSelf: "center",
      fontSize: RESULT_WORD_FONT_SIZE,
      minHeight: RESULT_WORD_FONT_SIZE * 2.5,
      color: theme.colors.secondary,
    },
    listContainer: {
      padding: 15,
    },
  });
};
