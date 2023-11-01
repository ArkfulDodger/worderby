import { Text } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PromptText.styles";
import useResizingFont from "../../../../hooks/useResizingFont";

export type Props = {
  usedPrompt: string;
  unusedPrompt: string;
  pIndexInput: number;
};

const PromptText = ({ usedPrompt, unusedPrompt, pIndexInput }: Props) => {
  const styles = useStyles(createStyles);
  const {
    isFontSized: isPromptSized,
    fontSize: promptFontSize,
    onTextLayout: onPromptTextLayout,
  } = useResizingFont({ minFontSize: 15, startingFontSize: 20 });

  return (
    <Text
      onTextLayout={onPromptTextLayout}
      style={styles.prompt(promptFontSize, isPromptSized)}
    >
      <Text
        onTextLayout={onPromptTextLayout}
        style={
          pIndexInput === 0 ? styles.unusable : styles.unused(!isPromptSized)
        }
      >
        {unusedPrompt}
      </Text>
      {usedPrompt}
    </Text>
  );
};

export default PromptText;
