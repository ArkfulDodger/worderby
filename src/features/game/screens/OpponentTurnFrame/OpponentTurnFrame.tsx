import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./OpponentTurnFrame.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectLastPlayerTurn } from "../../gameSelectors";
import useResizingFont from "../../../../hooks/useResizingFont";
import { getTurnScore } from "../../../../utils/helpers";
import { useMemo } from "react";

type Props = {};

// the frame displayed during the opponent's turn
// shows the word just played and the score earned
const OpponentTurnFrame = ({}: Props) => {
  const styles = useStyles(createStyles);
  const lastPlayerTurn = useAppSelector(selectLastPlayerTurn);
  const { isFontSized, fontSize, onTextLayout } = useResizingFont({
    minFontSize: 20,
    startingFontSize: 30,
  });
  const stolenLetters = lastPlayerTurn.word.slice(0, lastPlayerTurn.pNum);
  const addedLetters = lastPlayerTurn.word.slice(lastPlayerTurn.pNum);
  const score = useMemo(() => getTurnScore(lastPlayerTurn), [lastPlayerTurn]);

  // useEffect(() => {
  //   console.log("last player turn:", JSON.stringify(lastPlayerTurn, null, 2));
  // }, [lastPlayerTurn]);

  return (
    <View style={styles.container}>
      <Text
        onTextLayout={onTextLayout}
        style={styles.text(fontSize, isFontSized)}
      >
        <Text onTextLayout={onTextLayout} style={styles.stolen}>
          {stolenLetters}
        </Text>
        {addedLetters}
      </Text>
      <Text>+{score}</Text>
    </View>
  );
};

export default OpponentTurnFrame;
