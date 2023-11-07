// import { ButtonProps, Button as PaperButton } from "react-native-paper";

import { StatusBar, StatusBarProps } from "expo-status-bar";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectIsDark } from "../../reducers/themeReducer";

export type Props = StatusBarProps;

const ThemedStatusBar = (props: Props) => {
  const isDark = useAppSelector(selectIsDark);

  const statusBarProps: Props = {
    style: isDark ? "light" : "dark",
    ...props,
  };

  return <StatusBar {...statusBarProps} />;
};

export default ThemedStatusBar;
