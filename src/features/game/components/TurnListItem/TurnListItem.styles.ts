import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { Turn } from "../../../../store/slices/gameSlice";
import { fontScaled } from "../../../../utils/helpers";

export const RESULT_WORD_FONT_SIZE = 24;

interface StaticStyles {
  container: ViewStyle;
  mainScore: ViewStyle;
  wordText: TextStyle;
  scoreText: TextStyle;
  stolen: TextStyle;
  timerIcon: TextStyle;
}

interface DynamicStyles {
  timerScore: (score: number) => TextStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme, turn: Turn): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      alignSelf: turn.isPlayer ? "flex-start" : "flex-end",
      maxWidth: "70%",
      minHeight: RESULT_WORD_FONT_SIZE * 2.5,
    },
    mainScore: {
      columnGap: 10,
      flexDirection: turn.isPlayer ? "row" : "row-reverse",
    },
    timerIcon: {
      fontSize: fontScaled(RESULT_WORD_FONT_SIZE * 0.64),
    },
    wordText: {
      fontSize: RESULT_WORD_FONT_SIZE,
    },
    scoreText: {
      fontSize: RESULT_WORD_FONT_SIZE,
      fontWeight: "bold",
      color: turn.isPlayer ? "magenta" : "#c18617",
    },
    stolen: {
      color: turn.isPlayer ? "magenta" : "#c18617",
    },
  });

  const dynamicStyles: DynamicStyles = {
    timerScore: (score) => ({
      color: score > 0 ? "green" : score < 0 ? "red" : theme.colors.text,
      fontSize: RESULT_WORD_FONT_SIZE * 0.8,
      fontWeight: "bold",
      position: "absolute",
      bottom: -RESULT_WORD_FONT_SIZE,
      paddingLeft: turn.isPlayer ? RESULT_WORD_FONT_SIZE * 1.2 : 0,
      paddingRight: turn.isPlayer ? 0 : RESULT_WORD_FONT_SIZE * 1.2,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
