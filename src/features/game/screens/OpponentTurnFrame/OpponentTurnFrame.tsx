import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./OpponentTurnFrame.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectLastPlayerTurn, selectOpponent } from "../../gameSelectors";
import { getTurnScore } from "../../../../utils/helpers";
import { useMemo } from "react";
import PlayedWordText from "../../components/PlayedWordText";
import PlayedWordScoreBreakdown from "../../components/PlayedWordScoreBreakdown";
import StartingWordText from "../../components/StartingWordText";

type Props = {};

// the frame displayed during the opponent's turn
// shows the word just played and the score earned
// if the player has yet to play, shows the starting word
const OpponentTurnFrame = ({}: Props) => {
  const styles = useStyles(createStyles);
  const lastPlayerTurn = useAppSelector(selectLastPlayerTurn);
  const score = useMemo(
    () => (!!lastPlayerTurn ? getTurnScore(lastPlayerTurn, true) : 0),
    [lastPlayerTurn]
  );
  const opponentName = useAppSelector(selectOpponent).name;

  return (
    <View style={styles.container}>
      {!lastPlayerTurn ? (
        <View style={styles.wordContainer}>
          <Text style={styles.labelText}>
            {opponentName}'s starting word is:
          </Text>
          <StartingWordText />
        </View>
      ) : (
        <>
          <View style={styles.wordContainer}>
            {/* <Text style={styles.labelText}>You Played:</Text> */}
            <PlayedWordText />
            <PlayedWordScoreBreakdown />
          </View>
          <View style={styles.scoreContainer}>
            {/* <Text style={styles.labelText}>You Scored:</Text> */}
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default OpponentTurnFrame;
