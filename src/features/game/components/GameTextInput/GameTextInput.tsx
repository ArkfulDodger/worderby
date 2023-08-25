import {
  Platform,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameTextInput.styles";
import { useMemo, useState } from "react";

export type Props = TextInputProps & {
  containerStyle?: ViewStyle;
  inputRef?: React.LegacyRef<TextInput>;
  fontSize?: number;
};

const GameTextInput = ({
  containerStyle,
  inputRef,
  fontSize = 30,
  style,
  ...props
}: Props) => {
  const styles = useStyles(createStyles, fontSize, [fontSize]);

  // the height of the text, including padding
  const [textHeight, setTextHeight] = useState<number>();

  // the descent of the font (half the distance for android)
  const descent = useMemo(() => {
    if (textHeight) {
      let heightDifference = textHeight - fontSize;
      if (heightDifference > 0) {
        return Platform.OS === "ios"
          ? heightDifference
          : heightDifference * 0.5;
      }
      return undefined;
    }
    return undefined;
  }, [textHeight, fontSize]);

  return (
    <View style={containerStyle}>
      {descent && <View style={styles.underline(descent)} />}
      <TextInput
        ref={inputRef}
        onLayout={(e) => setTextHeight(e.nativeEvent.layout.height)}
        style={[styles.input, style]}
        returnKeyLabel="Submit"
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

export default GameTextInput;
