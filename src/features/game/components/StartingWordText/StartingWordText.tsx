import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectStartingWord } from "../../gameSelectors";
import useResizingFont from "../../../../hooks/useResizingFont";
import { createStyles } from "./StartingWordText.styles";

type Props = {};

const StartingWordText = ({}: Props) => {
  const { isFontSized, fontSize, onTextLayout } = useResizingFont({
    minFontSize: 20,
    startingFontSize: 40,
  });
  const styles = useStyles(createStyles, {
    size: fontSize,
    display: isFontSized,
  });
  const startingWord = useAppSelector(selectStartingWord);

  return (
    <View style={styles.container}>
      <Text onTextLayout={onTextLayout} style={[styles.text]}>
        {startingWord}
      </Text>
    </View>
  );
};

export default StartingWordText;
