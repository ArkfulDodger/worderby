import { Text } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./RestrictionTextItem.styles";

export type RestrictionMatch = {
  str: string;
  matchNum: number;
};

export type Props = { str: string; matchNum: number };

const RestrictionTextItem = ({ str, matchNum }: Props) => {
  const styles = useStyles(createStyles);

  return <Text style={styles.endings(matchNum)}>-{str}</Text>;
};

export default RestrictionTextItem;
