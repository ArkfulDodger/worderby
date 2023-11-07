import { Text } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PromptText.styles";
import useResizingFont from "../../../../hooks/useResizingFont";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectPIndexInput, selectUsedUnusedPrompt } from "../../gameSelectors";

export type Props = {};

const PromptText = ({}: Props) => {
  const styles = useStyles(createStyles);

  const pIndexInput = useAppSelector(selectPIndexInput) || 1;
  const { unusedPrompt, usedPrompt } = useAppSelector(selectUsedUnusedPrompt);
  const { isFontSized, fontSize, onTextLayout } = useResizingFont({
    minFontSize: 15,
    startingFontSize: 20,
  });

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
