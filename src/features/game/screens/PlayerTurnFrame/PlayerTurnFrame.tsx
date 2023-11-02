import { Pressable, TextInput, View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayerTurnFrame.styles";
import PhantomText from "../../components/PhantomText";
import { Text } from "react-native-paper";
import GameTextInput from "../../components/GameTextInput";
import PromptGestureHandler from "../../components/PromptGestureHandler";
import PromptText from "../../components/PromptText";
import useResizingFont from "../../../../hooks/useResizingFont";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  handlePromptInput,
  setWordInput,
} from "../../../../reducers/playScreenReducer";

export type Props = {};

const PlayerTurnFrame = ({}: Props) => {
  const styles = useStyles(createStyles);

  // game and play state
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const play = useAppSelector((state) => state.play);

  // the input timeout for auto-merges (for voice typing)
  const [autoMergeTimeout, setAutoMergeTimeout] = useState<NodeJS.Timeout>();

  // use latest word played as prompt, or starting word if first turn
  const prompt = useMemo(
    () =>
      game.turns.length > 0
        ? game.turns[game.turns.length - 1].word
        : game.startingWord,
    [game.turns, game.startingWord]
  );

  // ensure inputs reset when prompt changes
  useEffect(() => {
    const defaultPIndex = Math.max(1, prompt.length - 1);
    dispatch(handlePromptInput(defaultPIndex));
  }, [prompt]);

  // input control
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

  // // the prompt string pieces which are used/unused
  const usedPrompt = useMemo(
    () => prompt.slice(play.pIndex),
    [prompt, play.pIndex]
  );
  const unusedPrompt = useMemo(
    () => prompt.slice(0, play.pIndex),
    [prompt, play.pIndex]
  );

  // adjust word input into a compatible prompt portion (for voice typing)
  const autoMerge = (str?: string) => {
    let text = str || play.wordInput;

    for (let i = 1; i < prompt.length; i++) {
      const possiblePrompt = prompt.slice(i);
      if (text.startsWith(possiblePrompt)) {
        dispatch(handlePromptInput(i));
        dispatch(setWordInput(text.slice(possiblePrompt.length)));
        return;
      }
    }
  };

  const updatePromptInput = (i: number) => {
    dispatch(handlePromptInput(i));
  };

  const onChangeGameTextTextInput = (str: string) => {
    // assume an input change of more than one letter at a time might be a whole word
    if (Math.abs(str.length - play.wordInput.length) > 1) {
      clearTimeout(autoMergeTimeout);
      const timeout = setTimeout(() => autoMerge(str), 300);
      setAutoMergeTimeout(timeout);
    }

    dispatch(setWordInput(str));
  };

  return (
    <Pressable onPress={toggleInputFocus} style={styles.container}>
      <View style={styles.playWord(isWordSplit)}>
        <PhantomText
          text={usedPrompt + (play.wordInput === "" ? "_" : play.wordInput)}
          fontSize={wordFontSize}
          idealFontSize={30}
          onSizingTextLayout={onSizingTextLayout}
          onLargerSizingTextLayout={onLargerSizingTextLayout}
          onIdealSizingTextLayout={onIdealSizingTextLayout}
        />
        <View style={styles.stolenContainer(isWordSplit)}>
          <Text style={styles.stolenLetters(wordFontSize)}>{usedPrompt}</Text>
        </View>
        <GameTextInput
          inputRef={playerInputRef}
          multilineInputRef={multilineInputRef}
          value={play.wordInput}
          onChangeText={onChangeGameTextTextInput}
          fontSize={wordFontSize}
          multiline={isWordSplit}
          containerStyle={styles.inputContainer(isWordSplit)}
        />
      </View>
      <PromptGestureHandler
        promptLength={prompt.length}
        pIndex={play.pIndex}
        updatePromptInput={updatePromptInput}
      >
        <View style={styles.promptInputArea}>
          <PromptText
            usedPrompt={usedPrompt}
            unusedPrompt={unusedPrompt}
            pIndexInput={play.pIndexInput}
          />
        </View>
      </PromptGestureHandler>
    </Pressable>
  );
};

export default PlayerTurnFrame;
