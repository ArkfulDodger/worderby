import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  promptInputArea: ViewStyle;
}

interface DynamicStyles {
  stolenLetters: (size: number) => TextStyle;
  playWord: (split?: boolean) => ViewStyle;
  stolenContainer: (isSplit: boolean) => ViewStyle;
  inputContainer: (isSplit: boolean) => ViewStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      flex: 1,
    },
    promptInputArea: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primaryContainer,
      flex: 1,
      paddingHorizontal: 15,
    },
  });

  const dynamicStyles: DynamicStyles = {
    playWord: (split?: boolean) => ({
      flex: 2,
      paddingHorizontal: 15,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: split ? "column" : "row",
    }),
    stolenLetters: (size: number) => ({
      fontSize: size,
      color: "magenta",
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
