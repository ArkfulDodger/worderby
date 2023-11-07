import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayWordText.styles";
import PhantomText from "../PhantomText";
import { Text } from "react-native-paper";
import GameTextInput from "../GameTextInput";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectIsWordSplit,
  selectUsedUnusedPrompt,
  selectWordInput,
} from "../../gameSelectors";
import useResizingFont from "../../../../hooks/useResizingFont";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsWordSplit } from "../../../../slices/gameSlice";

type Props = {
  maxWidth?: number; // the calculated width the text can fill
};

// the displayed play word (combined used prompt and text input)
// uses phantom text to determine when the word needs to be split
const PlayWordText = ({ maxWidth }: Props) => {
  const styles = useStyles(createStyles);
  const dispatch = useDispatch();
  const { usedPrompt } = useAppSelector(selectUsedUnusedPrompt);
  const wordInput = useAppSelector(selectWordInput);
  const isWordSplit = useAppSelector(selectIsWordSplit);
  const { fontSize, onTextLayout, onSizeUpLayout, onIdealSizeLayout, isAtMin } =
    useResizingFont({ elastic: true, minFontSize: 20, startingFontSize: 30 });

  // update word split state
  useEffect(() => {
    dispatch(setIsWordSplit(isAtMin));
  }, [isAtMin]);

  return (
    <View style={styles.playWord(isWordSplit)}>
      <PhantomText
        width={maxWidth}
        text={usedPrompt + (wordInput === "" ? "_" : wordInput)}
        fontSize={fontSize}
        idealFontSize={30}
        onSizingTextLayout={onTextLayout}
        onLargerSizingTextLayout={onSizeUpLayout}
        onIdealSizingTextLayout={onIdealSizeLayout}
      />
      <View style={styles.stolenContainer(isWordSplit)}>
        <Text style={styles.stolenLetters(fontSize)}>{usedPrompt}</Text>
      </View>
      <GameTextInput value={wordInput} fontSize={fontSize} />
    </View>
  );
};

export default PlayWordText;
