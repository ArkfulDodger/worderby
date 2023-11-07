import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./AppWrapper.styles";
import useThemeControl from "../hooks/useThemeControl";
import ThemedStatusBar from "../../../components/molecules/ThemedStatusBar";
import useAppState from "../hooks/useAppState";

type Props = {
  children: React.ReactNode;
};

// responsible for wrapping the app in global providers (other than redux store)
const AppWrapper = ({ children }: Props) => {
  const styles = useStyles(createStyles);

  // track the app state
  useAppState();

  // get the controlled theme object to pass to providers
  const theme = useThemeControl();

  return (
    <GestureHandlerRootView style={styles.fill}>
      <PaperProvider theme={theme as ThemeProp}>
        <NavigationContainer theme={theme}>
          <SafeAreaProvider>
            {children}
            <ThemedStatusBar />
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default AppWrapper;
