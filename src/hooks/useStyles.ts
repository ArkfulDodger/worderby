import { useTheme } from "react-native-paper";
import { useMemo } from "react";
import { AppTheme } from "../utils/types";

// take a style-creation function, and return its memoized style object, incorporating theme
const useStyles = <T>(
  createStyles: (theme: AppTheme) => T,
  deps: any[] = []
): T => {
  // get the app theme, relative to where the hook has been called
  const theme = useTheme() as AppTheme;

  // memoize the returned styles, to be recalculated when theme or deps are changed
  const styles = useMemo(() => createStyles(theme), [theme, ...deps]);

  return styles;
};

export default useStyles;
