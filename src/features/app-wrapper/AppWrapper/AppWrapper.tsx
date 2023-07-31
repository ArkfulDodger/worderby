import { Provider as PaperProvider } from "react-native-paper";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { lightTheme, darkTheme } from "../../../theme/themes";
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

// responsible for wrapping the app in global providers
const AppWrapper = ({ children }: Props) => {
  const { isDark } = useAppSelector((state) => ({
    isDark: state.theme.isDark,
  }));
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <PaperProvider theme={theme as ThemeProp}>
      <NavigationContainer theme={theme}>
        <SafeAreaProvider>
          {children}
          <StatusBar style={isDark ? "light" : "dark"} />
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppWrapper;
