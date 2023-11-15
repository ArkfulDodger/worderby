import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  list: ViewStyle;
}

interface DynamicStyles {
  endings: (n: number) => TextStyle;
  container: (isCentered: boolean) => ViewStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    list: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      columnGap: 20,
    },
  });

  const dynamicStyles: DynamicStyles = {
    endings: (n) => ({
      color: n === Infinity ? "red" : theme.colors.text,
      fontWeight: n > 1 ? "bold" : "normal",
      opacity: n === 0 ? 0.4 : 1,
    }),
    container: (isCentered) => ({
      overflow: "hidden",
      justifyContent: isCentered ? "center" : "flex-start",
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
