import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  list: ViewStyle;
}

interface DynamicStyles {
  endings: (n: number) => TextStyle;
}

export interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      //
    },
    list: {
      flexDirection: "row",
      flexWrap: "wrap",
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
  };

  return { ...staticStyles, ...dynamicStyles };
};
