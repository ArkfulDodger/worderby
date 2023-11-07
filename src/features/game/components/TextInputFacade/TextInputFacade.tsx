import { useMemo } from "react";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./TextInputFacade.styles";
import { PixelRatio, Platform, StyleProp, TextStyle, View } from "react-native";
import { Text } from "react-native-paper";

export type Props = {
  fontSize: number;
  isCaretVisible: boolean;
  caretIndex: number;
  value?: string;
  style?: StyleProp<TextStyle>;
  textHeight?: number;
};

// the visible "text input" text, underline, and caret that the user sees
const TextInputFacade = ({
  value,
  textHeight,
  fontSize,
  isCaretVisible,
  caretIndex,
  style,
}: Props) => {
  const styles = useStyles(createStyles, fontSize, [fontSize]);
  const scaleFactor = PixelRatio.getFontScale();

  // the caret to display on the text input
  const caret = isCaretVisible && (
    <View>
      <View style={styles.caret(textHeight)} />
    </View>
  );

  // the descent of the font (half the distance for android)
  const descent = useMemo(() => {
    if (textHeight) {
      let heightDifference = textHeight - fontSize * scaleFactor;
      if (heightDifference > 0) {
        return Platform.OS === "ios"
          ? heightDifference
          : heightDifference * 0.5;
      } else return undefined;
    } else return undefined;
  }, [textHeight, fontSize]);

  return (
    <>
      {descent && <View style={styles.underline(descent)} />}
      <View style={styles.mockInputContainer(textHeight)}>
        <Text selectable={false} style={[styles.text, style]}>
          {value?.slice(0, caretIndex) || ""}
        </Text>
        {caret}
        <Text selectable={false} style={[styles.text, style]}>
          {value?.slice(caretIndex) || ""}
        </Text>
      </View>
    </>
  );
};

export default TextInputFacade;
