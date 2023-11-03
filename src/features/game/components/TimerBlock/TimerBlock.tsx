import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TimerBlock.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";

export type Props = {};

const TimerBlock = ({}: Props) => {
  const styles = useStyles(createStyles);
  const mode = useAppSelector((state) => state.game.mode);
  const count = useAppSelector((state) => state.activeTurn.timerCount);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{mode === "competitive" ? count : "∞"}</Text>
    </View>
  );
};

export default TimerBlock;
