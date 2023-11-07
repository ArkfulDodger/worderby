import { useTheme } from "react-native-paper";
import { useMemo } from "react";
import { AppTheme } from "../utils/types";

// take a style-creation function, and return its memoized style object, incorporating theme
const useStyles = <T>(
  createStyles: (theme: AppTheme, vars?: any) => T,
  vars: any = undefined,
  deps: any[] = []
): T => {
  // get an array of the variables to pass as dependencies to the styles memo
  const varsDeps = Array.isArray(vars)
    ? vars
    : typeof vars === "object"
    ? Object.values(vars)
    : [vars];

  // get the app theme, relative to where the hook has been called
  const theme = useTheme() as AppTheme;

  // memoize the returned styles, to be recalculated when theme or deps are changed
  const styles = useMemo(
    () => createStyles(theme, vars),
    [theme, ...varsDeps, ...deps]
  );

  return styles;
};

export default useStyles;
