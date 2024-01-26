import { StyleSheet, TextStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  unusable: TextStyle;
}

interface DynamicStyles {
  prompt: (size: number, display: boolean) => TextStyle;
  unused: (forceBold: boolean) => TextStyle;
}

interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    unusable: {
      fontSize: undefined, // inherit from prompt
      textAlign: undefined, // inherit from prompt
      color: theme.colors.notification,
      fontWeight: "normal",
    },
  });

  const dynamicStyles: DynamicStyles = {
    prompt: (size: number, display: boolean) => ({
      fontSize: size,
      color: display ? theme.colors.player : "transparent",
      fontWeight: "bold",
      textAlign: "center",
    }),
    unused: (forceBold: boolean) => ({
      fontSize: undefined, // inherit from prompt
      textAlign: undefined, // inherit from prompt
      // color: undefined, // inherit from prompt
      opacity: 0.7,
      fontWeight: forceBold ? "bold" : "normal", // force bold prior to display for sizing
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
