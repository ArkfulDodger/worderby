import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import PlayerScoreBlock from "../../components/PlayerScoreBlock";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TimerBlock from "../../components/TimerBlock";
import TurnCounter from "../../components/TurnCounter";
import { IconButton, Surface, Text } from "react-native-paper";
import Button from "../../../../components/atoms/Button";

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

  let worderbyte = "word";

  let wordInput = "er";

  let promptWord: string = "word";
  let pIndexInput: number = 1;
  let pIndex = Math.max(1, pIndexInput);
  let usedPrompt = promptWord.slice(pIndex);
  let unusedPrompt = promptWord.slice(0, pIndex);

  const focusInput = () => {
    //
  };

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
          <Text style={styles.worderbyte}>{worderbyte}</Text>
        </Pressable>
      </Surface>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.playArea}
      >
        <Pressable onPress={focusInput} style={styles.playWord}>
          <View>
            <Text style={styles.stolenLetters}>{usedPrompt}</Text>
          </View>
          <TextInput style={styles.input} value={wordInput} />
        </Pressable>
        <Pressable style={styles.promptInput}>
          <Text style={styles.prompt}>
            <Text style={pIndex === 0 ? styles.unusable : styles.unused}>
              {unusedPrompt}
            </Text>
            {usedPrompt}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      <Surface style={styles.footer}>
        <IconButton icon="home" />
        <Button>SUBMIT</Button>
        <IconButton icon="volume-off" />
      </Surface>
    </View>
  );
};

export default GamePage;
