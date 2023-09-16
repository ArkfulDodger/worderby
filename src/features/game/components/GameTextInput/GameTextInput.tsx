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
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../../../../utils/types";

export type Props = TextInputProps & {
  containerStyle?: ViewStyle;
  inputRef: React.RefObject<TextInput>;
  multilineInputRef: React.RefObject<TextInput>;
  fontSize?: number;
};

// The text input component used during gameplay
const GameTextInput = ({
  containerStyle,
  inputRef,
  multilineInputRef,
  fontSize = 30,
  style,
  value,
  multiline,
  onChangeText,
  ...props
}: Props) => {
  const styles = useStyles(createStyles, fontSize, [fontSize]);
  const { colors } = useTheme() as AppTheme;

  // the height of the text, including padding
  const [textHeight, setTextHeight] = useState<number>();

  // whether to show the caret
  const [caretIndex, setCaretIndex] = useState(0);
  const [isCaretVisible, setIsCaretVisible] = useState(false);
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

  // focus input on android after first render (keyboard layout bug if immediate focus)
  const [hasRendered, setHasRendered] = useState(false);
  const onComponentRender = () => {
    if (!hasRendered) setHasRendered(true);
  };

  const [canFocus, setCanFocus] = useState(false);

  // once all necessary components have measured and rendered, allow input focus
  useEffect(() => {
    if (inputRef.current && hasRendered && textHeight && !canFocus) {
      setCanFocus(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 1);
    }
  }, [inputRef.current, hasRendered, textHeight]);

  // when multiline or focus settings change, focus the appropriate input
  useEffect(() => {
    if (canFocus) {
      if (multiline) multilineInputRef.current?.focus();
      else inputRef.current?.focus();
    }
  }, [multiline]);

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

  // ensures only English alphabet characters (lower case) are submitted
  const handleChangeText = (text: string) => {
    let validatedText = text.replace(/[^a-zA-Z]/g, "").toLowerCase();

    if (onChangeText) {
      return onChangeText(validatedText);
    } else {
      return validatedText;
    }
  };

  // the base props utilized by the text input
  const inputBaseProps: Partial<TextInputProps> = {
    value: value,
    onBlur: hideCaret,
    onChangeText: handleChangeText,
    onFocus: showCaret,
    autoFocus: false,
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: false,
    blurOnSubmit: false,
    contextMenuHidden: true,
    disableFullscreenUI: true, // android
    enablesReturnKeyAutomatically: true, // ios
    importantForAutofill: "no", // android
    keyboardType: "ascii-capable", // ios
    maxLength: 44, // longest english word is 45 letters
    returnKeyType: "go",
    selectTextOnFocus: false,
  };

  return (
    <View onLayout={onComponentRender} style={containerStyle}>
      {!multiline && (
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
      )}
      <TextInput
        {...inputBaseProps}
        ref={inputRef}
        multiline={false}
        numberOfLines={1}
        style={[
          styles.text,
          style,
          styles.hiddenInput,
          multiline ? styles.hiddenOffscreen : undefined,
        ]}
        caretHidden={true}
        cursorColor={!multiline ? colors.outline : "transparent"}
        onSelectionChange={multiline ? undefined : handleSelectionChange}
        onLayout={(e) => setTextHeight(e.nativeEvent.layout.height)}
        {...props}
      />
      <TextInput
        {...inputBaseProps}
        ref={multilineInputRef}
        multiline={true}
        numberOfLines={multiline ? 3 : 1}
        style={[
          styles.text,
          style,
          styles.multiline,
          Platform.OS === "ios" ? styles.multilineIosPadding : undefined,
          !multiline ? styles.hiddenOffscreen : undefined,
        ]}
        caretHidden={!multiline}
        cursorColor={multiline ? colors.outline : "transparent"}
        onSelectionChange={multiline ? handleSelectionChange : undefined}
        {...props}
      />
    </View>
  );
};

export default GameTextInput;
