import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./AppWrapper.styles";
import useThemeControl from "../hooks/useThemeControl";
import ThemedStatusBar from "../../../components/molecules/ThemedStatusBar";
import useAppState from "../hooks/useAppState";
import WordListProvider from "../Providers/WordListProvider";
import { Theme, ThemeProvider } from "@react-navigation/native";

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
    <PaperProvider theme={theme as ThemeProp}>
      <ThemeProvider value={theme as Theme}>
        <WordListProvider>
          {children}
          <ThemedStatusBar />
        </WordListProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default AppWrapper;
