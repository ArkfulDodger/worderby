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
  worderbyteContainer: ViewStyle;
  worderbyte: TextStyle;
  promptInput: ViewStyle;
  unusable: TextStyle;
}

interface DynamicStyles {
  stolenLetters: (size: number) => TextStyle;
  playWord: (split?: boolean) => ViewStyle;
  prompt: (size: number, display: boolean) => TextStyle;
  unused: (forceBold: boolean) => TextStyle;
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
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingBottom: 5,
    },
    centerContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      columnGap: 4,
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
    unusable: {
      fontSize: undefined, // inherit from prompt
      textAlign: undefined, // inherit from prompt
      color: "red",
      fontWeight: "normal",
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
    prompt: (size: number, display: boolean) => ({
      fontSize: size,
      color: display ? "magenta" : "transparent",
      fontWeight: "bold",
      textAlign: "center",
    }),
    unused: (forceBold: boolean) => ({
      fontSize: undefined, // inherit from prompt
      color: undefined, // inherit from prompt
      textAlign: undefined, // inherit from prompt
      opacity: 0.5,
      fontWeight: forceBold ? "bold" : "normal", // force bold prior to display for sizing
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
