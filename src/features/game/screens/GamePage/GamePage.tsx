import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GamePage.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Surface, Text, TouchableRipple } from "react-native-paper";
import { useEffect, useMemo, useRef, useState } from "react";
import PromptGestureHandler from "../../components/PromptGestureHandler";
import GameTextInput from "../../components/GameTextInput";
import PlayerScoreBlock from "../../components/PlayerScoreBlock";
import TurnCounter from "../../components/TurnCounter";
import TimerBlock from "../../components/TimerBlock";
import useResizingFont from "../../../../hooks/useResizingFont";
import PhantomText from "../../components/PhantomText";
import Button from "../../../../components/atoms/Button";
import PromptText from "../../components/PromptText";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { getWorderbyte } from "../../../../utils/helpers";

export type Props = {};

export type GameUser = {};

const GamePage = ({}: Props) => {
  // hooks
  const styles = useStyles(createStyles);
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
  const game = useAppSelector((state) => state.game);

  // update the worderbyte any time the starting word or turns change
  const worderbyte = useMemo(
    () => getWorderbyte(game.startingWord, game.turns),
    [game.startingWord, game.turns]
  );

  // use latest word played as prompt, or starting word if first turn
  const prompt =
    game.turns.length > 0
      ? game.turns[game.turns.length - 1].word
      : game.startingWord;

  // longest English word (for testing): pneumonoultramicroscopicsilicovolcanoconiosis

  // turn variables
  const timerCount = 5;

  // the playerInputs
  const [pIndexInput, setPIndexInput] = useState<number>(
    Math.max(1, prompt.length - 1)
  );
  const [wordInput, setWordInput] = useState("");

  // ensure inputs reset when prompt changes
  useEffect(() => {
    setPIndexInput(Math.max(1, prompt.length - 1));
  }, [prompt]);

  // the input timeout for auto-merges (for voice typing)
  const [autoMergeTimeout, setAutoMergeTimeout] = useState<NodeJS.Timeout>();

  // the active pIndex (cannot be lower than 1)
  const pIndex = useMemo(() => Math.max(1, pIndexInput), [pIndexInput]);

  // // the prompt string pieces which are used/unused
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
        <Surface style={styles.outerHeaderContainer}>
          <Surface style={styles.innerHeaderContainer}>
            <SafeAreaView edges={["top"]} style={styles.headerContent}>
              <PlayerScoreBlock isPlayer />

              <View style={styles.centerContainer}>
                <TurnCounter isPlayer />
                <TimerBlock count={timerCount} />
                <TurnCounter />
              </View>

              <PlayerScoreBlock />
            </SafeAreaView>
          </Surface>

          <TouchableRipple
            onPress={playWorderbyte}
            style={styles.worderbyteContainer}
          >
            <Text style={styles.worderbyte}>{worderbyte}</Text>
          </TouchableRipple>
        </Surface>

        <Pressable onPress={toggleInputFocus} style={styles.playAreaContainer}>
          <View style={styles.playWord(isWordSplit)}>
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
          </View>
          <PromptGestureHandler
            promptLength={prompt.length}
            pIndex={pIndex}
            updatePromptInput={handlePromptInput}
          >
            <View style={styles.promptInput}>
              <PromptText
                usedPrompt={usedPrompt}
                unusedPrompt={unusedPrompt}
                pIndexInput={pIndexInput}
              />
            </View>
          </PromptGestureHandler>
        </Pressable>
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
