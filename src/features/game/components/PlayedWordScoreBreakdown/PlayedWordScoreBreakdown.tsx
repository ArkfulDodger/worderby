import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayedWordScoreBreakdown.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectLastPlayerTurn } from "../../gameSelectors";
import {
  ADDED_LETTER_VALUE,
  MAX_ADDED_SCORE,
  PROMPT_LETTER_VALUE,
} from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {};

const PlayedWordScoreBreakdown = ({}: Props) => {
  const styles = useStyles(createStyles);
  const lastPlayerTurn = useAppSelector(selectLastPlayerTurn);

  if (!lastPlayerTurn) return null;

  const stolenLetters = lastPlayerTurn.word.slice(0, lastPlayerTurn.pNum);
  const addedLetters = lastPlayerTurn.word.slice(lastPlayerTurn.pNum);

  const stolenScore = stolenLetters.length * PROMPT_LETTER_VALUE;
  const addedScore = Math.min(
    addedLetters.length * ADDED_LETTER_VALUE,
    MAX_ADDED_SCORE
  );

  return (
    <View style={styles.container}>
      <View style={styles.letterScoreContainer}>
        <Text style={[styles.stolen, styles.letterScore]}>+{stolenScore}</Text>
        <Text style={styles.letterScore}>
          +{addedScore}
          {addedScore === MAX_ADDED_SCORE && (
            <Text style={styles.maxText}>{" max!"}</Text>
          )}
        </Text>
      </View>
      {!!lastPlayerTurn.endTimer && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText(lastPlayerTurn.endTimer)}>
            {lastPlayerTurn.endTimer > 0 ? "+" : ""}
            {lastPlayerTurn.endTimer}
            <MaterialCommunityIcons
              style={styles.timerIcon(lastPlayerTurn.endTimer)}
              name="timer-outline"
            />
          </Text>
        </View>
      )}
    </View>
  );
};

export default PlayedWordScoreBreakdown;
