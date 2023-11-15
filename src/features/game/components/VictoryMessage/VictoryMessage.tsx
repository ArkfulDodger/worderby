import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import useStyles from "../../../../hooks/useStyles";
import { selectGameResult, selectOpponent } from "../../gameSelectors";
import { createStyles } from "./VictoryMessage.styles";
import { GameResult } from "../../enums";
import { useMemo } from "react";

type Props = {};

const VictoryMessage = ({}: Props) => {
  const { name: opponentName } = useAppSelector(selectOpponent);
  const gameResult = useAppSelector(selectGameResult);
  const styles = useStyles(createStyles, gameResult);

  const initialText =
    gameResult === GameResult.Lose ? (
      <Text style={styles.opponent}>{opponentName}</Text>
    ) : (
      ""
    );
  const primaryText = useMemo(() => {
    switch (gameResult) {
      case GameResult.Ongoing:
        return "Game Ongoing";
      case GameResult.Win:
        return "You win!";
      case GameResult.Lose:
        return " wins!";
      case GameResult.Draw:
        return "Draw";
      case GameResult.PlayerQuit:
        return "You quit the game";
      case GameResult.OpponentQuit:
        return `${opponentName} quit the game`;
      case GameResult.Unknown:
        return "Game Over";
      default:
        return "Game Over";
    }
  }, [gameResult, opponentName]);

  return (
    <Text style={styles.text}>
      {initialText}
      {primaryText}
    </Text>
  );
};

export default VictoryMessage;
