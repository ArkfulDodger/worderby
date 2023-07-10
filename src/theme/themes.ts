import { colors } from "./colors";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import merge from "deepmerge";
import { AppTheme } from "../utils/types";

// compile combined default themes from RN Paper and React Navigation
const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

// define settings that are the same regardless of dark/light mode
const universalSettings: Partial<AppTheme> = {
  roundness: 10,
  // fonts
};

export const lightTheme: AppTheme = {
  ...CombinedDefaultTheme,
  ...universalSettings,
  dark: false,
  colors: { ...CombinedDefaultTheme.colors, ...colors.light },
};

export const darkTheme: AppTheme = {
  ...CombinedDarkTheme,
  ...universalSettings,
  dark: true,
  mode: "adaptive",
  colors: { ...CombinedDarkTheme.colors, ...colors.dark },
};
