import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import PlayerScoreBlock from "../../components/PlayerScoreBlock";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TimerBlock from "../../components/TimerBlock";
import TurnCounter from "../../components/TurnCounter";

export type Props = {};

const GamePage = ({}: Props) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(createStyles, insets, [insets]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PlayerScoreBlock isPlayer1 />
        <View style={styles.centerContainer}>
          <TurnCounter value={2} />
          <TimerBlock count={5} />
          <TurnCounter value={1} />
        </View>
        <PlayerScoreBlock />
      </View>
    </View>
  );
};

export default GamePage;
