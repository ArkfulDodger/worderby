import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./OpponentTurnFrame.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectLastPlayerTurn } from "../../gameSelectors";
import { getTurnScore } from "../../../../utils/helpers";
import { useMemo } from "react";
import PlayedWordText from "../../components/PlayedWordText";
import PlayedWordScoreBreakdown from "../../components/PlayedWordScoreBreakdown";

type Props = {};

// the frame displayed during the opponent's turn
// shows the word just played and the score earned
const OpponentTurnFrame = ({}: Props) => {
  const styles = useStyles(createStyles);
  const lastPlayerTurn = useAppSelector(selectLastPlayerTurn);
  const score = useMemo(
    () => getTurnScore(lastPlayerTurn, true),
    [lastPlayerTurn]
  );

  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <Text style={styles.labelText}>You Played:</Text>
        <PlayedWordText />
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.labelText}>You Scored:</Text>
        <PlayedWordScoreBreakdown />
        <Text style={styles.scoreText}>{score}</Text>
      </View>
    </View>
  );
};

export default OpponentTurnFrame;
