import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import PlayerTurnFrame from "../PlayerTurnFrame";
import GameHeader from "../../components/GameHeader";
import GameFooter from "../../components/GameFooter";
import KeyboardAvoidingView from "../../../../components/atoms/KeyboardAvoidingView";

export type Props = {};

// a full-screen component for playing the actual game cycle
const GamePage = ({}: Props) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAwareContainer}>
        <GameHeader />
        <PlayerTurnFrame />
      </KeyboardAvoidingView>
      <GameFooter />
    </View>
  );
};

export default GamePage;
