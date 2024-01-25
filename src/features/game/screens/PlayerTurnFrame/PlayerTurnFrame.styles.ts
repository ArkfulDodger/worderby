import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  playWordArea: ViewStyle;
  promptInputArea: ViewStyle;
}

interface DynamicStyles {
  stolenLetters: (size: number) => TextStyle;
  playWord: (split?: boolean) => ViewStyle;
  stolenContainer: (isSplit: boolean) => ViewStyle;
  inputContainer: (isSplit: boolean) => ViewStyle;
}

interface Styles extends StaticStyles, DynamicStyles {}

export const PLAY_AREA_PADDING = 15;

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      flex: 1,
    },
    playWordArea: {
      flex: 2,
      paddingHorizontal: PLAY_AREA_PADDING,
      alignItems: "center",
      justifyContent: "center",
    },
    promptInputArea: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primaryContainer,
      flex: 1,
      paddingHorizontal: PLAY_AREA_PADDING,
    },
  });

  const dynamicStyles: DynamicStyles = {
    playWord: (split?: boolean) => ({
      flexDirection: split ? "column" : "row",
    }),
    stolenLetters: (size: number) => ({
      fontSize: size,
      color: theme.colors.player,
    }),
    stolenContainer: (isSplit) => ({
      alignSelf: isSplit ? "flex-start" : "center",
    }),
    inputContainer: (isSplit) => ({
      alignSelf: isSplit ? "flex-end" : "center",
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
