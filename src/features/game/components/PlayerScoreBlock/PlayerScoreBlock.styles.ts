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

interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme, isPlayer: boolean): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      alignItems: isPlayer ? "flex-start" : "flex-end",
    },
    score: {
      fontSize: 30,
    },
    playerInfo: {
      flexDirection: isPlayer ? "row" : "row-reverse",
      alignItems: "center",
    },
    avatar: {
      marginLeft: isPlayer ? 0 : 10,
      marginRight: isPlayer ? 10 : 0,
    },
    playerName: {
      flex: 1,
      textAlign: isPlayer ? "left" : "right",
    },
  });

  const dynamicStyles: DynamicStyles = {
    // define dynamic styles
  };

  return { ...staticStyles, ...dynamicStyles };
};
