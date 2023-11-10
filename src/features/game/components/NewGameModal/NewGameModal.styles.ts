import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
  blocks: ViewStyle;
  divider: ViewStyle;
  row: ViewStyle;
}

interface DynamicStyles {
  // define dynamic style types
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      rowGap: 20,
    },
    button: {
      marginHorizontal: 30,
    },
    text: {
      textAlign: "center",
    },
    blocks: {
      rowGap: 10,
    },
    divider: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
    },
  });

  const dynamicStyles: DynamicStyles = {
    // define dynamic styles
  };

  return { ...staticStyles, ...dynamicStyles };
};
