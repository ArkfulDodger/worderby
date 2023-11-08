import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  stolen: TextStyle;
}

interface DynamicStyles {
  text: (size: number, display: boolean) => TextStyle;
}

interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    stolen: {
      fontSize: undefined, // inherit from text
      color: "magenta", // inherit from text
      textAlign: undefined, // inherit from text
      opacity: 0.5,
    },
  });

  const dynamicStyles: DynamicStyles = {
    text: (size: number, display: boolean) => ({
      fontSize: size,
      color: display ? theme.colors.text : "transparent",
      textAlign: "center",
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
