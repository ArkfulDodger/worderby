import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./NewGameFrame.styles";
import { Text } from "react-native-paper";

type Props = {};

const NewGameFrame = ({}: Props) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text>Press the button to start the game!</Text>
    </View>
  );
};

export default NewGameFrame;
