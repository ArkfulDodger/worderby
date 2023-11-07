import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayWordText.styles";
import PhantomText from "../PhantomText";
import { Text } from "react-native-paper";
import GameTextInput from "../GameTextInput";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectUsedUnusedPrompt, selectWordInput } from "../../gameSelectors";
import useResizingFont from "../../../../hooks/useResizingFont";

export type Props = {};

// the displayed play word (combined used prompt and text input)
// uses phantom text to determine when the word needs to be split
const PlayWordText = ({}: Props) => {
  const styles = useStyles(createStyles);
  const { usedPrompt } = useAppSelector(selectUsedUnusedPrompt);
  const wordInput = useAppSelector(selectWordInput);
  const {
    fontSize,
    onTextLayout,
    onSizeUpLayout,
    onIdealSizeLayout,
    isAtMin: isWordSplit,
  } = useResizingFont({ elastic: true, minFontSize: 20, startingFontSize: 30 });

  return (
    <View style={styles.playWord(isWordSplit)}>
      <PhantomText
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
      <GameTextInput
        value={wordInput}
        fontSize={fontSize}
        multiline={isWordSplit}
        containerStyle={styles.inputContainer(isWordSplit)}
      />
    </View>
  );
};

export default PlayWordText;
