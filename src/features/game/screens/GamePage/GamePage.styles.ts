import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { EdgeInsets } from "react-native-safe-area-context";

export interface Styles {
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
  unused: TextStyle;
  prompt: TextStyle;
}

export const createStyles = (theme: AppTheme, insets: EdgeInsets): Styles => {
  return StyleSheet.create<Styles>({
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
      flex: 1,
    },
    unusable: {
      color: "red",
    },
    unused: {
      color: "magenta",
      opacity: 0.5,
    },
    prompt: {
      fontSize: 20,
      color: "magenta",
      fontWeight: "bold",
    },
  });
};
