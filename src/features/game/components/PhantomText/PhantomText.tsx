import {
  NativeSyntheticEvent,
  Text,
  TextLayoutEventData,
  View,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PhantomText.styles";

type Props = {
  width?: number;
  text: string;
  fontSize: number;
  idealFontSize: number;
  onSizingTextLayout: (
    event: NativeSyntheticEvent<TextLayoutEventData>
  ) => void;
  onLargerSizingTextLayout: (
    event: NativeSyntheticEvent<TextLayoutEventData>
  ) => void;
  onIdealSizingTextLayout: (
    event: NativeSyntheticEvent<TextLayoutEventData>
  ) => void;
};

// invisible text which uses useResizingFont callbacks for font size calculation
// do not run layout calculations until a width has been established
const PhantomText = ({
  width,
  text,
  fontSize,
  idealFontSize,
  onSizingTextLayout,
  onLargerSizingTextLayout,
  onIdealSizingTextLayout,
}: Props) => {
  const styles = useStyles(createStyles, { width, fontSize, idealFontSize });

  return (
    <View style={styles.container}>
      <Text
        onTextLayout={width ? onSizingTextLayout : undefined}
        style={[styles.text, styles.currentText]}
      >
        {text}
      </Text>
      <Text
        onTextLayout={width ? onLargerSizingTextLayout : undefined}
        style={[styles.text, styles.sizeUpText]}
      >
        {text}
      </Text>
      <Text
        onTextLayout={width ? onIdealSizingTextLayout : undefined}
        style={[styles.text, styles.idealText]}
      >
        {text}
      </Text>
    </View>
  );
};

export default PhantomText;
