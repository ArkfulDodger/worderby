import { Text } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./RestrictionTextItem.styles";
import { View } from "react-native";

export type RestrictionMatch = {
  str: string;
  matchNum: number;
};

export type Props = { str: string; matchNum: number };

const RestrictionTextItem = ({ str, matchNum }: Props) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.endings(matchNum)}>-{str}</Text>
    </View>
  );
};

export default RestrictionTextItem;
