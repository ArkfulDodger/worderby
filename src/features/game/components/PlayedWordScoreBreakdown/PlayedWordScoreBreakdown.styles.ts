import { PixelRatio, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  stolen: TextStyle;
  letterScore: TextStyle;
  letterScoreContainer: ViewStyle;
  timerContainer: ViewStyle;
  timerIcon: TextStyle;
  maxText: TextStyle;
}

interface DynamicStyles {
  timerText: (count: number) => TextStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

const FONT_SIZE = 18;

export const createStyles = (theme: AppTheme): Styles => {
  const scaleFactor = PixelRatio.getFontScale();

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
      color: "magenta",
    },
    letterScoreContainer: {
      flexDirection: "row",
      marginHorizontal: 30,
    },
    timerContainer: {
      justifyContent: "center",
    },
    timerIcon: {
      position: "absolute",
      right: -FONT_SIZE * 0.9 * scaleFactor,
      fontSize: FONT_SIZE * 0.8 * scaleFactor,
    },
    maxText: {
      fontStyle: "italic",
      fontSize: 12,
    },
  });

  const dynamicStyles: DynamicStyles = {
    timerText: (count) => ({
      fontSize: FONT_SIZE,
      fontWeight: "bold",
      color: count > 0 ? "green" : count < 0 ? "red" : theme.colors.text,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
