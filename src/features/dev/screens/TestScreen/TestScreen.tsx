import { Pressable, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { Text } from "react-native-paper";
import { toggleDarkMode } from "../../../../reducers/themeReducer";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TestScreen.styles";

const TestScreen = () => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleTheme}>
        <Text>Toggle Theme: {isDark ? "Dark" : "Light"}</Text>
      </Pressable>
    </View>
  );
};

export default TestScreen;
