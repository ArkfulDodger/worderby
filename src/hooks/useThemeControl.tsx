import { Appearance, ColorSchemeName } from "react-native";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  setDarkModeOff,
  setDarkModeOn,
  setSystemTheme,
} from "../reducers/themeReducer";
import { useEffect, useMemo } from "react";
import { darkTheme, lightTheme } from "../theme/themes";

const useThemeControl = () => {
  const { systemTheme, isDark } = useAppSelector((state) => state.theme);
  const { themePreference, isAppActive } = useAppSelector(
    (state) => state.system
  );
  const dispatch = useAppDispatch();

  // refresh system theme in state
  const refreshSystemTheme = () => {
    const currentSystemTheme = Appearance.getColorScheme(); // will be "dark" or "light"
    if (systemTheme !== currentSystemTheme)
      dispatch(setSystemTheme(currentSystemTheme));
  };

  // set the active theme according the passed Color Scheme
  const setActiveThemeAs = (colorScheme: ColorSchemeName) => {
    if (colorScheme === "dark") dispatch(setDarkModeOn());
    else if (colorScheme === "light") dispatch(setDarkModeOff());
  };

  // when the app regains focus, refresh the system theme in case it has changed
  useEffect(() => {
    if (isAppActive) refreshSystemTheme();
  }, [isAppActive]);

  // update active theme when either system theme or theme preference changes
  useEffect(() => {
    if (!themePreference) setActiveThemeAs(systemTheme);
    else setActiveThemeAs(themePreference);
  }, [systemTheme, themePreference]);

  // memoize the theme object, updating when theme state changes
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return theme;
};

export default useThemeControl;
