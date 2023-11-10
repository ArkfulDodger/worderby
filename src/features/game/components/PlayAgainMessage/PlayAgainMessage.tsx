import { Text } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import Button from "../../../../components/atoms/Button";
import { View } from "react-native";
import OrDivider from "../../../../components/atoms/OrDivider";
import { createStyles } from "./PlayAgainMessage.styles";

type Props = {};

const PlayAgainMessage = ({}: Props) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.blocks}>
        <Text style={styles.text}>
          Continue your streak{"\n"}restricted endings carry over
        </Text>
        <Button style={styles.button}>Continue</Button>
      </View>
      <OrDivider />
      <View style={styles.blocks}>
        <Text style={styles.text}>Start a new game</Text>
        <Button style={styles.button}>Reset</Button>
      </View>
    </View>
  );
};

export default PlayAgainMessage;
