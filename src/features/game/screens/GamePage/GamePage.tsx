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
import { IconButton, Surface, Text, TouchableRipple } from "react-native-paper";
import Button from "../../../../components/atoms/Button";
import { useMemo, useRef, useState } from "react";
import PromptGestureHandler from "../../components/PromptGestureHandler";

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
  const wordInput = "er";

  // the pIndex the player is trying to enact
  const [pIndexInput, setPIndexInput] = useState<number>(1);

  // the active pIndex (cannot be lower than 1)
  const pIndex = useMemo(() => Math.max(1, pIndexInput), [pIndexInput]);

  // the prompt string pieces which are used/unused
  const usedPrompt = useMemo(() => prompt.slice(pIndex), [prompt, pIndex]);
  const unusedPrompt = useMemo(() => prompt.slice(0, pIndex), [prompt, pIndex]);

  // handle the prompt gesture input
  const handlePromptInput = (index: number) => setPIndexInput(index);

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
    // TODO:  if placed in a container, container's height must be defined for Android
    //        for Android keyboard behavior to function properly. iOS can be flex 1
    <>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.playAreaContainer}
      >
        <Pressable onPress={toggleInputFocus} style={styles.playWord}>
          <View>
            <Text style={styles.stolenLetters}>{usedPrompt}</Text>
          </View>
          <TextInput
            ref={playerInputRef}
            style={styles.input}
            value={wordInput}
            returnKeyLabel="Submit"
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
              <Text style={pIndexInput === 0 ? styles.unusable : styles.unused}>
                {unusedPrompt}
              </Text>
              {usedPrompt}
            </Text>
          </Pressable>
        </PromptGestureHandler>
      </KeyboardAvoidingView>
      <Surface style={styles.footerContainer}>
        <IconButton icon="home" />
        <Button>SUBMIT</Button>
        <IconButton icon={isMuted ? "volume-off" : "volume-high"} />
      </Surface>
    </>
  );
};

export default GamePage;
