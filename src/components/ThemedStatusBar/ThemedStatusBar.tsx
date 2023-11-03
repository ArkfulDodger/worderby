// import { ButtonProps, Button as PaperButton } from "react-native-paper";

import { StatusBar, StatusBarProps } from "expo-status-bar";
import { useAppSelector } from "../../hooks/reduxHooks";

export type Props = StatusBarProps;

const ThemedStatusBar = (props: Props) => {
	const { isDark } = useAppSelector((state) => state.theme);

  const statusBarProps: Props = {
		style: isDark ? "light" : "dark",
    ...props,
  };

  return <StatusBar {...statusBarProps} />;
};

export default ThemedStatusBar;
