import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  keyboardAwareContainer: ViewStyle;
  outerHeaderContainer: ViewStyle;
  playAreaContainer: ViewStyle;
  footerContainer: ViewStyle;
  footerContent: ViewStyle;
  innerHeaderContainer: ViewStyle;
  headerContent: ViewStyle;
  centerContainer: ViewStyle;
  scoreContainer: ViewStyle;
  worderbyteContainer: ViewStyle;
  worderbyte: TextStyle;
  promptInput: ViewStyle;
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
    keyboardAwareContainer: {
      flex: 1,
    },
    outerHeaderContainer: {
      backgroundColor: "#DDDDDD",
    },
    playAreaContainer: {
      flex: 1,
    },
    footerContainer: {
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    footerContent: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    innerHeaderContainer: {
      backgroundColor: "#EEEEEE",
    },
    headerContent: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingBottom: 5,
    },
    centerContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      columnGap: 4,
      marginHorizontal: 5,
    },
    scoreContainer: {
      flex: 1,
    },
    worderbyteContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
      paddingVertical: 4,
    },
    worderbyte: {
      fontSize: 15,
    },
    promptInput: {
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
