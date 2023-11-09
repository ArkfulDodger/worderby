import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import PlayerTurnFrame from "../PlayerTurnFrame";
import GameHeader from "../../components/GameHeader";
import GameFooter from "../../components/GameFooter";
import KeyboardAvoidingView from "../../../../components/atoms/KeyboardAvoidingView";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectRoundPhase } from "../../gameSelectors";
import { RoundPhase } from "../../enums";
import NewGameFrame from "../NewGameFrame";
import OpponentTurnFrame from "../OpponentTurnFrame";
import useWorderbot from "../../hooks/useWorderbot";
import ResultsFrame from "../ResultsFrame";

type Props = {};

// a full-screen component for playing the actual game cycle
const GamePage = ({}: Props) => {
  const styles = useStyles(createStyles);
  const phase = useAppSelector(selectRoundPhase);

  // enable worderbot (only used if single player)
  useWorderbot();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAwareContainer}>
        <GameHeader />
        <View style={styles.frameContainer}>
          {phase === RoundPhase.NewGame && <NewGameFrame />}
          {phase === RoundPhase.PlayerTurn && <PlayerTurnFrame />}
          {phase === RoundPhase.OpponentTurn && <OpponentTurnFrame />}
          {phase === RoundPhase.Results && <ResultsFrame />}
        </View>
      </KeyboardAvoidingView>
      <GameFooter />
    </View>
  );
};

export default GamePage;
