// import { ButtonProps, Button as PaperButton } from "react-native-paper";

import { StatusBar, StatusBarProps } from "expo-status-bar";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectIsDark } from "../../../store/slices/themeSlice";

// status bar component which will update its style to fit dark/light theme
const ThemedStatusBar = (props: StatusBarProps) => {
  const isDark = useAppSelector(selectIsDark);

  const statusBarProps: StatusBarProps = {
    style: isDark ? "light" : "dark",
    ...props,
  };

  return <StatusBar {...statusBarProps} />;
};

export default ThemedStatusBar;
