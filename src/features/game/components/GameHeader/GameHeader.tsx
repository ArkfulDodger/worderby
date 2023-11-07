import { Surface, Text, TouchableRipple } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameHeader.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayerScoreBlock from "../PlayerScoreBlock";
import { View } from "react-native";
import TurnCounter from "../TurnCounter";
import TimerBlock from "../TimerBlock";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { useMemo } from "react";
import { getWorderbyte } from "../../../../utils/helpers";

export type Props = {};

// The header component for the game cycle
// Includes player displays (name & avatar), scores, turn counters, timer, and worderbyte
const GameHeader = ({}: Props) => {
  const styles = useStyles(createStyles);
  const game = useAppSelector((state) => state.game);

  // update the worderbyte any time the starting word or turns change
  const worderbyte = useMemo(
    () => getWorderbyte(game.startingWord, game.turns),
    [game.startingWord, game.turns]
  );

  // play the worderbyte audio
  const playWorderbyte = () => {
    console.log("worderbyte pressed");
  };

  return (
    <Surface style={styles.outerHeaderContainer}>
      <Surface style={styles.innerHeaderContainer}>
        <SafeAreaView edges={["top"]} style={styles.headerContent}>
          <PlayerScoreBlock isPlayer style={styles.scoreContainer} />

          <View style={styles.centerContainer}>
            <TurnCounter isPlayer />
            <TimerBlock />
            <TurnCounter />
          </View>

          <PlayerScoreBlock style={styles.scoreContainer} />
        </SafeAreaView>
      </Surface>

      <TouchableRipple
        onPress={playWorderbyte}
        style={styles.worderbyteContainer}
      >
        <Text style={styles.worderbyte}>{worderbyte}</Text>
      </TouchableRipple>
    </Surface>
  );
};

export default GameHeader;