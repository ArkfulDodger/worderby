import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayedWordText.styles";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectLastPlayerTurn } from "../../gameSelectors";
import useResizingFont from "../../../../hooks/useResizingFont";

type Props = {};

const PlayedWordText = ({}: Props) => {
  const { isFontSized, fontSize, onTextLayout, isAtMin } = useResizingFont({
    minFontSize: 20,
    startingFontSize: 40,
  });
  const styles = useStyles(createStyles, {
    isSplit: isAtMin,
    size: fontSize,
    display: isFontSized,
  });
  const lastPlayerTurn = useAppSelector(selectLastPlayerTurn);
  const stolenLetters = lastPlayerTurn.word.slice(0, lastPlayerTurn.pNum);
  const addedLetters = lastPlayerTurn.word.slice(lastPlayerTurn.pNum);

  return (
    <View style={styles.container}>
      <Text onTextLayout={onTextLayout} style={[styles.text, styles.invisible]}>
        {stolenLetters}
        {addedLetters}
      </Text>
      <Text style={[styles.text, styles.stolen, styles.splitLeft]}>
        {stolenLetters}
      </Text>
      <Text style={[styles.text, styles.splitRight]}>{addedLetters}</Text>
    </View>
  );
};

export default PlayedWordText;
