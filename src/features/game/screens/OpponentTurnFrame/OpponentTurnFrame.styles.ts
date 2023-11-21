import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { PLAY_AREA_PADDING } from "../PlayerTurnFrame/PlayerTurnFrame.styles";

interface StaticStyles {
  container: ViewStyle;
  wordContainer: ViewStyle;
  scoreContainer: ViewStyle;
  scoreText: TextStyle;
  labelText: TextStyle;
}

interface DynamicStyles {
  //
}

interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      flex: 1,
      justifyContent: "center",
      alignSelf: "stretch",
      alignItems: "stretch",
      paddingHorizontal: PLAY_AREA_PADDING,
      paddingVertical: 50,
      // rowGap: 100,
    },
    wordContainer: {
      flex: 1,
      // backgroundColor: "magenta",
      justifyContent: "center",
      alignItems: "center",
      rowGap: 20,
    },
    scoreContainer: {
      flex: 1,
      // backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      rowGap: 20,
      // paddingBottom: 40,
    },
    scoreText: {
      fontSize: 50,
      fontWeight: "bold",
    },
    labelText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.secondary,
    },
  });

  const dynamicStyles: DynamicStyles = {
    //
  };

  return { ...staticStyles, ...dynamicStyles };
};
