import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  score: TextStyle;
  playerInfo: ViewStyle;
  avatar: ViewStyle;
  playerName: TextStyle;
}

interface DynamicStyles {
  // define dynamic style types
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme, isPlayer1: boolean): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      alignItems: isPlayer1 ? "flex-start" : "flex-end",
    },
    score: {
      fontSize: 30,
    },
    playerInfo: {
      flexDirection: isPlayer1 ? "row" : "row-reverse",
      alignItems: "center",
    },
    avatar: {
      marginLeft: isPlayer1 ? 0 : 10,
      marginRight: isPlayer1 ? 10 : 0,
    },
    playerName: {
      //
    },
  });

  const dynamicStyles: DynamicStyles = {
    // define dynamic styles
  };

  return { ...staticStyles, ...dynamicStyles };
};
