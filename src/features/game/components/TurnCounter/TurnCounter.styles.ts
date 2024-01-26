import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";
import { fontScaled } from "../../../../utils/helpers";

interface StaticStyles {
  container: ViewStyle;
}

interface DynamicStyles {
  dot: (current?: boolean) => ViewStyle;
}

interface Styles extends StaticStyles, DynamicStyles {}

export const createStyles = (theme: AppTheme): Styles => {
  const size = fontScaled(8);

  const staticStyles = StyleSheet.create<StaticStyles>({
    container: {
      flexDirection: "column-reverse",
      rowGap: 3,
      width: size,
    },
  });

  const dynamicStyles: DynamicStyles = {
    dot: (current) => ({
      backgroundColor: current ? theme.colors.notification : theme.colors.secondary,
      opacity: current ? 1 : 0.9,
      width: size,
      height: size,
      borderRadius: size * 0.5,
    }),
  };

  return { ...staticStyles, ...dynamicStyles };
};
