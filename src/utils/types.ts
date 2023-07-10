import {
  MD3Colors,
  MD3Theme,
} from "react-native-paper/lib/typescript/src/types";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from "@react-navigation/native";

// colors which can be/are customized within the app
export type CustomizedColors = Partial<
  MD3Colors &
    typeof NavigationDefaultTheme.colors &
    typeof NavigationDarkTheme.colors
> & {
  // added colors go here
};

// all colors which are defined by the app theme
type AppColors = MD3Colors &
  typeof NavigationDefaultTheme.colors &
  typeof NavigationDarkTheme.colors &
  CustomizedColors;

// merged RN Paper and React Navigation theme, using full app colors
export type AppTheme = Omit<Theme, "colors"> &
  Omit<MD3Theme, "colors"> & { colors: AppColors };
