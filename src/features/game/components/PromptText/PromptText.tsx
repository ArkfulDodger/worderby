import { Text } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PromptText.styles";
import useResizingFont from "../../../../hooks/useResizingFont";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { selectPIndexInput, selectUsedUnusedPrompt } from "../../gameSelectors";
import { useEffect } from "react";
import { recordStartTimeIfEmpty } from "../../../../store/slices/gameSlice";

type Props = {};

// the displayed text of the prompt word, showing which letters are selected
const PromptText = ({}: Props) => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const pIndexInput = useAppSelector(selectPIndexInput) || 1;
  const { unusedPrompt, usedPrompt } = useAppSelector(selectUsedUnusedPrompt);
  const { isFontSized, fontSize, onTextLayout } = useResizingFont({
    minFontSize: 15,
    startingFontSize: 20,
  });

  // set the start time as soon as the prompt is sized (made visible)
  useEffect(() => {
    if (isFontSized) {
      dispatch(recordStartTimeIfEmpty());
    }
  }, [isFontSized]);

  return (
    <Text
      onTextLayout={onTextLayout}
      style={styles.prompt(fontSize, isFontSized)}
    >
      <Text
        onTextLayout={onTextLayout}
        style={
          pIndexInput === 0 ? styles.unusable : styles.unused(!isFontSized)
        }
      >
        {unusedPrompt}
      </Text>
      {usedPrompt}
    </Text>
  );
};

export default PromptText;
