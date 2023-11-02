import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TimerBlock.styles";
import { Text } from "react-native-paper";

export type Props = {
  count?: number;
};

const TimerBlock = ({ count }: Props) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count || "∞"}</Text>
    </View>
  );
};

export default TimerBlock;
