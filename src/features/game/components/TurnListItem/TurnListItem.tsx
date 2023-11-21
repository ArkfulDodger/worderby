import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TurnListItem.styles";
import { Text } from "react-native-paper";
import { Turn } from "../../../../store/slices/gameSlice";
import { getTimerScore, getTurnScore } from "../../../../utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  turn: Turn;
};

const TurnListItem = ({ turn }: Props) => {
  const styles = useStyles(createStyles, turn);
  const wordScore = getTurnScore(turn, false);
  const stolenLetters = turn.word.slice(0, turn.pNum);
  const addedLetters = turn.word.slice(turn.pNum);
  const timerScore = getTimerScore(turn.endTimer);

  return (
    <View style={styles.container}>
      <View style={styles.mainScore}>
        <Text style={styles.scoreText}>+{wordScore}</Text>
        {!!timerScore && (
          <Text style={styles.timerScore(timerScore)}>
            {timerScore > 0 ? "+" : ""}
            {timerScore}
            <MaterialCommunityIcons
              name="timer-outline"
              style={styles.timerIcon}
            />
          </Text>
        )}
        <Text style={styles.wordText}>
          <Text style={styles.stolen}>{stolenLetters}</Text>
          {addedLetters}
        </Text>
      </View>
    </View>
  );
};

export default TurnListItem;
