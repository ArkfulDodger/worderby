import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { IconButton, Surface, Text, TouchableRipple } from "react-native-paper";
import { useMemo, useRef, useState } from "react";
import PromptGestureHandler from "../../components/PromptGestureHandler";
import GameTextInput from "../../components/GameTextInput";
import PlayerScoreBlock from "../../components/PlayerScoreBlock";
import TurnCounter from "../../components/TurnCounter";
import TimerBlock from "../../components/TimerBlock";
import useResizingFont from "../../../../hooks/useResizingFont";
import PhantomText from "../../components/PhantomText";
import Button from "../../../../components/atoms/Button";

export type Props = {};

export type GameUser = {};

const GamePage = ({}: Props) => {
  // hooks
  const insets = useSafeAreaInsets();
  const styles = useStyles(createStyles, insets, [insets]);
  const {
    isFontSized: isPromptSized,
    fontSize: promptFontSize,
    onTextLayout: onPromptTextLayout,
  } = useResizingFont({ minFontSize: 15, startingFontSize: 20 });
  const {
    fontSize: wordFontSize,
    onTextLayout: onSizingTextLayout,
    onSizeUpLayout: onLargerSizingTextLayout,
    onIdealSizeLayout: onIdealSizingTextLayout,
    isAtMin: isWordSplit,
  } = useResizingFont({ elastic: true, minFontSize: 20, startingFontSize: 30 });

  // refs
  const playerInputRef = useRef<TextInput>(null);
  const multilineInputRef = useRef<TextInput>(null);

  // settings
  const isMuted = false;

  // game state
  const playerScore = 404;
  const opponentScore = 666;
  const playerTurnCount = 2;
  const opponentTurnCount = 1;
  const worderbyte = "word";
  const prompt = "word";

  // longest English word (for testing): pneumonoultramicroscopicsilicovolcanoconiosis

  // turn variables
  const timerCount = 5;

  // the playerInputs
  const [pIndexInput, setPIndexInput] = useState<number>(prompt.length - 1);
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
  const focusInput = () =>
    isWordSplit && multilineInputRef.current
      ? multilineInputRef.current.focus()
      : playerInputRef.current?.focus();
  const blurInput = () =>
    isWordSplit && multilineInputRef.current
      ? multilineInputRef.current.blur()
      : playerInputRef.current?.blur();
  const toggleInputFocus = () =>
    (
      isWordSplit && multilineInputRef.current
        ? multilineInputRef.current.isFocused()
        : playerInputRef.current?.isFocused()
    )
      ? blurInput()
      : focusInput();

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
          <Pressable
            onPress={toggleInputFocus}
            style={styles.playWord(isWordSplit)}
          >
            <PhantomText
              text={usedPrompt + (wordInput === "" ? "_" : wordInput)}
              fontSize={wordFontSize}
              idealFontSize={30}
              onSizingTextLayout={onSizingTextLayout}
              onLargerSizingTextLayout={onLargerSizingTextLayout}
              onIdealSizingTextLayout={onIdealSizingTextLayout}
            />
            <View style={styles.stolenContainer(isWordSplit)}>
              <Text style={styles.stolenLetters(wordFontSize)}>
                {usedPrompt}
              </Text>
            </View>
            <GameTextInput
              inputRef={playerInputRef}
              multilineInputRef={multilineInputRef}
              value={wordInput}
              onChangeText={handleWordInput}
              fontSize={wordFontSize}
              multiline={isWordSplit}
              containerStyle={styles.inputContainer(isWordSplit)}
            />
          </Pressable>
          <PromptGestureHandler
            promptLength={prompt.length}
            pIndex={pIndex}
            updatePromptInput={handlePromptInput}
          >
            <Pressable onPress={toggleInputFocus} style={styles.promptInput}>
              <Text
                onTextLayout={onPromptTextLayout}
                style={styles.prompt(promptFontSize, isPromptSized)}
              >
                <Text
                  onTextLayout={onPromptTextLayout}
                  style={
                    pIndexInput === 0
                      ? styles.unusable
                      : styles.unused(!isPromptSized)
                  }
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
        <SafeAreaView edges={["bottom"]} style={styles.footerContent}>
          <IconButton icon="home" />
          <Button>SUBMIT</Button>
          <IconButton icon={isMuted ? "volume-off" : "volume-high"} />
        </SafeAreaView>
      </Surface>
    </View>
  );
};

export default GamePage;
