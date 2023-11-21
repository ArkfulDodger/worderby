import { Pressable, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { Text } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TestScreen.styles";
import { useCallback } from "react";
import {
  selectIsDark,
  setThemePreference,
} from "../../../../store/slices/themeSlice";

// screen to use for testing
const TestScreen = () => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectIsDark);

  const toggleTheme = useCallback(() => {
    dispatch(setThemePreference(isDark ? "light" : "dark"));
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleTheme}>
        <Text>Toggle Theme: {isDark ? "Dark" : "Light"}</Text>
      </Pressable>
    </View>
  );
};

export default TestScreen;
