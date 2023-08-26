import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TextInputSelectionChangeEventData,
  View,
  ViewStyle,
} from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameTextInput.styles";
import { useMemo, useState } from "react";

export type Props = TextInputProps & {
  containerStyle?: ViewStyle;
  inputRef: React.RefObject<TextInput>;
  fontSize?: number;
};

const GameTextInput = ({
  containerStyle,
  inputRef,
  fontSize = 30,
  style,
  value,
  onChangeText,
  ...props
}: Props) => {
  const styles = useStyles(createStyles, fontSize, [fontSize]);

  // the height of the text, including padding
  const [textHeight, setTextHeight] = useState<number>();

  // whether to show the caret
  const [caretIndex, setCaretIndex] = useState(0);
  const [isCaretVisible, setIsCaretVisible] = useState(true);
  const showCaret = () => setIsCaretVisible(true);
  const hideCaret = () => setIsCaretVisible(false);
  const handleSelectionChange = (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => {
    let isCaretSinglePosition =
      e.nativeEvent.selection.start === e.nativeEvent.selection.end;

    if (isCaretSinglePosition) {
      !isCaretVisible && showCaret();
      setCaretIndex(e.nativeEvent.selection.start);
    } else if (!isCaretSinglePosition && isCaretVisible) {
      hideCaret();
    }
  };

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

  const caret = isCaretVisible && (
    <View>
      <View style={styles.caret(textHeight)} />
    </View>
  );

  // notes for caret animation

  // useEffect(() => {
  //   let caretTimeout: NodeJS.Timeout;

  //   if (children && scrollIndex >= children.length) {
  //     setIsCaretOn(false);
  //   } else {
  //     caretTimeout = setTimeout(() => {
  //       setIsCaretOn((prev) => !prev);
  //     }, 700);
  //   }

  //   return () => {
  //     clearTimeout(caretTimeout);
  //   };
  // }, [isCaretOn, scrollIndex]);

  // const caret = (
  //   <Animated.View
  //     entering={FadeIn}
  //     exiting={FadeOut.duration(600)}
  //     style={styles.caretContainer}
  //   >
  //     <Text style={styles.caret}>{"   "}</Text>
  //   </Animated.View>
  // );

  // ensures only English alphabet characters (lower case) are submitted
  const handleChangeText = (text: string) => {
    let validatedText = text.replace(/[^a-zA-Z]/g, "").toLowerCase();

    if (onChangeText) {
      return onChangeText(validatedText);
    } else {
      return validatedText;
    }
  };

  return (
    <View style={containerStyle}>
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
      <TextInput
        ref={inputRef}
        value={value}
        style={[styles.text, style, styles.hiddenInput]}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        autoFocus
        blurOnSubmit={false}
        caretHidden={true}
        contextMenuHidden={true}
        cursorColor={"transparent"}
        disableFullscreenUI // android
        enablesReturnKeyAutomatically // ios
        importantForAutofill="no" // android
        keyboardType="ascii-capable" // ios
        maxLength={50} // longest english word is 45 letters
        onBlur={hideCaret}
        onChangeText={handleChangeText}
        onFocus={showCaret}
        onLayout={(e) => setTextHeight(e.nativeEvent.layout.height)}
        onSelectionChange={handleSelectionChange}
        returnKeyType="go"
        selectTextOnFocus={false}
        {...props}
      />
    </View>
  );
};

export default GameTextInput;
