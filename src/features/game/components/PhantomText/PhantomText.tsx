import {
  NativeSyntheticEvent,
  Text,
  TextLayoutEventData,
  View,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PhantomText.styles";
import metrics from "../../../../utils/metrics";

export type Props = {
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
const PhantomText = ({
  text,
  fontSize,
  idealFontSize,
  onSizingTextLayout,
  onLargerSizingTextLayout,
  onIdealSizingTextLayout,
}: Props) => {
  const styles = useStyles(createStyles);

  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "transparent",
        width: metrics.screenWidth - 30,
        alignItems: "center",
      }}
    >
      <Text
        onTextLayout={onSizingTextLayout}
        style={{
          position: "absolute",
          color: "transparent",
          opacity: 0.3,
          fontSize: fontSize,
        }}
      >
        {text}
      </Text>
      <Text
        onTextLayout={onLargerSizingTextLayout}
        style={{
          position: "absolute",
          color: "transparent",
          opacity: 0.3,
          fontSize: fontSize + 1,
        }}
      >
        {text}
      </Text>
      <Text
        onTextLayout={onIdealSizingTextLayout}
        style={{
          position: "absolute",
          color: "transparent",
          opacity: 0.3,
          fontSize: idealFontSize,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default PhantomText;
