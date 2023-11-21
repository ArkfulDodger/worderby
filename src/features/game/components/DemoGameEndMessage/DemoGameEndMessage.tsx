import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./DemoGameEndMessage.styles";
import { Text } from "react-native-paper";
import Button from "../../../../components/atoms/Button";
import OrDivider from "../../../../components/atoms/OrDivider";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectStreakCount } from "../../gameSelectors";

type Props = {
  onContinue: () => Promise<void>;
};

// The message that appears when the user tries to continue following the demo game
// allows them to play again or make an account after the first game
// only allows for making a new account from then on
const DemoGameEndMessage = ({ onContinue }: Props) => {
  const styles = useStyles(createStyles);
  const streakCount = useAppSelector(selectStreakCount);

  return (
    <>
      <View style={styles.container}>
        {streakCount === 0 && (
          <>
            <View style={styles.blocks}>
              <Text style={styles.text}>
                Try a rematch! See how the restricted endings from the first
                game carry over.
              </Text>
              <Button onPress={onContinue} style={styles.button}>
                Continue
              </Button>
            </View>
            <OrDivider />
          </>
        )}
        <View style={styles.blocks}>
          <Text style={styles.text}>
            Create an Account to start playing with friends!
          </Text>
          <Button
            onPress={() => console.log("create account!")}
            style={styles.button}
          >
            Sign In
          </Button>
        </View>
      </View>
    </>
  );
};

export default DemoGameEndMessage;
