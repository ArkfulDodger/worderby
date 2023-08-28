import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton, Surface, Text, TouchableRipple } from "react-native-paper";
import { useMemo, useRef, useState } from "react";
import PromptGestureHandler from "../../components/PromptGestureHandler";
import GameTextInput from "../../components/GameTextInput";
import Button from "../../../../components/atoms/Button";
import PlayerScoreBlock from "../../components/PlayerScoreBlock";
import TurnCounter from "../../components/TurnCounter";
import TimerBlock from "../../components/TimerBlock";

export type Props = {};

export type GameUser = {};

const GamePage = ({}: Props) => {
  // hooks
  const insets = useSafeAreaInsets();
  const styles = useStyles(createStyles, insets, [insets]);

  // refs
  const playerInputRef = useRef<TextInput>(null);

  // settings
  const isMuted = false;

  // game state
  const playerScore = 404;
  const opponentScore = 666;
  const playerTurnCount = 2;
  const opponentTurnCount = 1;
  const worderbyte = "word";
  const prompt = "word";

  // turn variables
  const timerCount = 5;

  // the playerInputs
  const [pIndexInput, setPIndexInput] = useState<number>(1);
  const [wordInput, setWordInput] = useState("");

  // the input timeout for auto-merges (for voice typing)
  const [autoMergeTimeout, setAutoMergeTimeout] = useState<NodeJS.Timeout>();

  // the active pIndex (cannot be lower than 1)
  const pIndex = useMemo(() => Math.max(1, pIndexInput), [pIndexInput]);

  // the prompt string pieces which are used/unused
  const usedPrompt = useMemo(() => prompt.slice(pIndex), [prompt, pIndex]);
  const unusedPrompt = useMemo(() => prompt.slice(0, pIndex), [prompt, pIndex]);

  // handle the prompt gesture input
  const handlePromptInput = (index: number) => setPIndexInput(index);

  // adjust word input into a compatible prompt portion (for voice typing)
  const autoMerge = (str?: string) => {
    let text = str || wordInput;

    for (let i = 1; i < prompt.length; i++) {
      const possiblePrompt = prompt.slice(i);
      if (text.startsWith(possiblePrompt)) {
        setPIndexInput(i);
        setWordInput(text.slice(possiblePrompt.length));
        return;
      }
    }
  };

  const handleWordInput = (str: string) => {
    // assume an input change of more than one letter at a time might be a whole word
    if (Math.abs(str.length - wordInput.length) > 1) {
      clearTimeout(autoMergeTimeout);
      const timeout = setTimeout(() => autoMerge(str), 300);
      setAutoMergeTimeout(timeout);
    }

    setWordInput(str);
  };

  // play the worderbyte audio
  const playWorderbyte = () => {
    console.log("Pressed");
  };

  // focus or blur the player text input
  const focusInput = () => playerInputRef.current?.focus();
  const blurInput = () => playerInputRef.current?.blur();
  const toggleInputFocus = () =>
    playerInputRef.current?.isFocused() ? blurInput() : focusInput();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAwareContainer}
      >
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
          <TouchableRipple
            onPress={playWorderbyte}
            style={styles.worderbyteContainer}
          >
            <Text style={styles.worderbyte}>{worderbyte}</Text>
          </TouchableRipple>
        </Surface>
        <View style={styles.playAreaContainer}>
          <Pressable onPress={toggleInputFocus} style={styles.playWord}>
            <View>
              <Text style={styles.stolenLetters}>{usedPrompt}</Text>
            </View>
            <GameTextInput
              inputRef={playerInputRef}
              value={wordInput}
              onChangeText={handleWordInput}
            />
          </Pressable>
          <PromptGestureHandler
            promptLength={prompt.length}
            pIndex={pIndex}
            updatePromptInput={handlePromptInput}
            focusInput={focusInput}
          >
            <Pressable onPress={blurInput} style={styles.promptInput}>
              <Text style={styles.prompt}>
                <Text
                  style={pIndexInput === 0 ? styles.unusable : styles.unused}
                >
                  {unusedPrompt}
                </Text>
                {usedPrompt}
              </Text>
            </Pressable>
          </PromptGestureHandler>
        </View>
      </KeyboardAvoidingView>
      <Surface style={styles.footerContainer}>
        <IconButton icon="home" />
        <Button>SUBMIT</Button>
        <IconButton icon={isMuted ? "volume-off" : "volume-high"} />
      </Surface>
    </View>
  );
};

export default GamePage;
