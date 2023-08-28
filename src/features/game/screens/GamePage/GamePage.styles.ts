import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { EdgeInsets } from "react-native-safe-area-context";

interface StaticStyles {
  container: ViewStyle;
  keyboardAwareContainer: ViewStyle;
  headerContainer: ViewStyle;
  playAreaContainer: ViewStyle;
  footerContainer: ViewStyle;
  header: ViewStyle;
  centerContainer: ViewStyle;
  worderbyteContainer: ViewStyle;
  worderbyte: TextStyle;
  playWord: ViewStyle;
  stolenLetters: TextStyle;
  promptInput: ViewStyle;
  unusable: TextStyle;
}

interface DynamicStyles {
  prompt: (size: number, display: boolean) => TextStyle;
  unused: (forceBold: boolean) => TextStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme, insets: EdgeInsets): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      flex: 1,
    },
    keyboardAwareContainer: {
      flex: 1,
    },
    headerContainer: {
      backgroundColor: "#DDDDDD",
    },
    playAreaContainer: {
      flex: 1,
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBottom: insets.bottom,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    header: {
      paddingTop: insets.top,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingBottom: 5,
      backgroundColor: "#EEEEEE",
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
    playWord: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    stolenLetters: {
      fontSize: 30,
      color: "magenta",
    },
    promptInput: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primaryContainer,
      flex: 1,
      padding: 15,
    },
    unusable: {
      fontSize: undefined, // inherit from prompt
      textAlign: undefined, // inherit from prompt
      color: "red",
      fontWeight: "normal",
    },
  });

  const dynamicStyles: DynamicStyles = {
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
  };

  return { ...staticStyles, ...dynamicStyles };
};
