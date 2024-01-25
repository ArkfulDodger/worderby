import { Provider as PaperProvider } from "react-native-paper";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./AppWrapper.styles";
import useThemeControl from "../hooks/useThemeControl";
import ThemedStatusBar from "../../../components/molecules/ThemedStatusBar";
import useAppState from "../hooks/useAppState";
import WordListProvider from "../Providers/WordListProvider";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { bgGradient } from "../../../theme/gradients";
import { useMemo } from "react";

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

  // get the background gradient
  const gradientProps = useMemo(() => bgGradient(theme), [theme]);

  return (
    <GestureHandlerRootView style={styles.fill}>
      <PaperProvider theme={theme as ThemeProp}>
        <ThemeProvider value={theme as Theme}>
          <WordListProvider>
            <LinearGradient style={styles.fill} {...gradientProps}>
              {children}
              <ThemedStatusBar />
            </LinearGradient>
          </WordListProvider>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default AppWrapper;
