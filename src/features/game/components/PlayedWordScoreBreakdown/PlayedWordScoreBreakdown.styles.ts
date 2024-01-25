import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { fontScaled } from "../../../../utils/helpers";

interface StaticStyles {
  container: ViewStyle;
  stolen: TextStyle;
  letterScore: TextStyle;
  letterScoreContainer: ViewStyle;
  timerContainer: ViewStyle;
  maxText: TextStyle;
}

interface DynamicStyles {
  timerIcon: (count: number) => TextStyle;
  timerText: (count: number) => TextStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

const FONT_SIZE = 18;

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      alignSelf: "stretch",
      alignItems: "center",
      // rowGap: 20,
    },
    letterScore: {
      flex: 1,
      fontSize: FONT_SIZE,
      fontWeight: "bold",
      textAlign: "center",
    },
    stolen: {
      color: theme.colors.player,
    },
    letterScoreContainer: {
      flexDirection: "row",
      marginHorizontal: 30,
    },
    timerContainer: {
      justifyContent: "center",
    },
    maxText: {
      fontStyle: "italic",
      fontSize: 12,
    },
  });

  const dynamicStyles: DynamicStyles = {
    timerIcon: (count) => ({
      fontSize: fontScaled(FONT_SIZE * 0.8),
      color: count > 0 ? "green" : count < 0 ? "red" : theme.colors.text,
    }),
    timerText: (count) => ({
      fontSize: FONT_SIZE,
      fontWeight: "bold",
      color: count > 0 ? "green" : count < 0 ? "red" : theme.colors.text,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
