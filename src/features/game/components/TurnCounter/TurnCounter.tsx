import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TurnCounter.styles";

export type Props = {
  value: number;
};

const TurnCounter = ({ value }: Props) => {
  const styles = useStyles(createStyles);

  const dot = <View style={styles.dot} />;
  let dots: JSX.Element[] = [];
  for (let i = 0; i < value; i++) {
    dots.push(dot);
  }

  return <View style={styles.container}>{dots}</View>;
};

export default TurnCounter;