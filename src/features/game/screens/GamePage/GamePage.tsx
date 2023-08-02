import { Pressable, View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import PlayerScoreBlock from "../../components/PlayerScoreBlock";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TimerBlock from "../../components/TimerBlock";
import TurnCounter from "../../components/TurnCounter";
import { Surface, Text } from "react-native-paper";

export type Props = {};

export type GameUser = {};

const GamePage = ({}: Props) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(createStyles, insets, [insets]);

  let playerScore = 404;
  let opponentScore = 666;
  let playerTurnCount = 2;
  let opponentTurnCount = 1;
  let timerCount = 5;

  return (
    <View style={styles.container}>
      <Surface style={styles.headerContainer}>
        <Surface style={styles.header}>
          <PlayerScoreBlock isPlayer />
          <View style={styles.centerContainer}>
            <TurnCounter value={playerTurnCount} />
            <TimerBlock count={timerCount} />
            <TurnCounter value={opponentTurnCount} />
          </View>
          <PlayerScoreBlock />
        </Surface>
        <Pressable style={styles.worderbyteContainer}>
          <Text style={styles.worderbyte}>worderbyte</Text>
        </Pressable>
      </Surface>
    </View>
  );
};

export default GamePage;
