import { StyleSheet, ViewStyle } from "react-native";
import { AppTheme } from "../../../../utils/types";

interface StaticStyles {
  container: ViewStyle;
  list: ViewStyle;
}

interface DynamicStyles {
  //
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
    // 
  };

  return { ...staticStyles, ...dynamicStyles };
};
