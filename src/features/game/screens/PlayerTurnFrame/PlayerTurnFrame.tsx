import { Pressable, View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayerTurnFrame.styles";
import PromptGestureHandler from "../../components/PromptGestureHandler";
import PromptText from "../../components/PromptText";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { selectPrompt } from "../../gameSelectors";
import {
  handlePromptInput,
  setWordInput,
  toggleInputFocus,
} from "../../../../slices/gameSlice";
import PlayWordText from "../../components/PlayWordText";

export type Props = {};

// the game frame displaying the Player Turn Phase
const PlayerTurnFrame = ({}: Props) => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const prompt = useAppSelector(selectPrompt);

  // ensure inputs reset when prompt changes
  useEffect(() => {
    const defaultPIndex = Math.max(1, prompt.length - 1);
    dispatch(handlePromptInput(defaultPIndex));
    dispatch(setWordInput(""));
  }, [prompt]);

  // toggle input focus when frame is pressed on
  const onPress = () => dispatch(toggleInputFocus());

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.playWordArea}>
        <PlayWordText />
      </View>
      <PromptGestureHandler>
        <View style={styles.promptInputArea}>
          <PromptText />
        </View>
      </PromptGestureHandler>
    </Pressable>
  );
};

export default PlayerTurnFrame;
