import {
  NativeSyntheticEvent,
  PixelRatio,
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useAutoMerge from "../../hooks/useAutoMerge";
import { setInputFocus, setWordInput } from "../../../../reducers/gameReducer";
import { selectInputFocus } from "../../gameSelectors";
import useBlurOnKeyboardDismiss from "../../hooks/useBlurOnKeyboardDismiss";

export type Props = TextInputProps & {
  containerStyle?: ViewStyle;
  fontSize?: number;
};

// The text input component used during gameplay
const GameTextInput = ({
  containerStyle,
  fontSize = 30,
  style,
  value,
  multiline,
  ...props
}: Props) => {
  const dispatch = useAppDispatch();
  const { checkInputForAutoMerge } = useAutoMerge();
  useBlurOnKeyboardDismiss();

  const styles = useStyles(createStyles, fontSize, [fontSize]);
  const { colors } = useTheme() as AppTheme;
  const scaleFactor = PixelRatio.getFontScale();
  const inputFocused = useAppSelector(selectInputFocus);

  // refs
  const inputRef = useRef<TextInput>(null);
  const multilineInputRef = useRef<TextInput>(null);

  // focus or blur the player text input
  const focusInput = () =>
    multiline && multilineInputRef.current
      ? multilineInputRef.current.focus()
      : inputRef.current?.focus();
  const blurInput = () =>
    multiline && multilineInputRef.current
      ? multilineInputRef.current.blur()
      : inputRef.current?.blur();

  useEffect(() => {
    // select the input ref currently in use based on whether the word is split
    const activeInputRef = multiline ? multilineInputRef : inputRef;

    // focus or blur the input to match the current state
    if (!inputFocused && activeInputRef.current?.isFocused()) blurInput();
    else if (inputFocused && !activeInputRef.current?.isFocused()) focusInput();
    0;
  }, [inputFocused]);

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

  const onFocus = () => {
    showCaret();
    if (!inputFocused) dispatch(setInputFocus(true));
  };

  const onBlur = () => {
    hideCaret();
    if (inputFocused) dispatch(setInputFocus(false));
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
        dispatch(setInputFocus(true));
        // inputRef.current?.focus();
      }, 1);
    }
  }, [inputRef.current, hasRendered, textHeight]);

  // when multiline or focus settings change, focus the appropriate input
  useEffect(() => {
    if (canFocus) {
      dispatch(setInputFocus(true));
      // if (multiline) multilineInputRef.current?.focus();
      // else inputRef.current?.focus();
    }
  }, [multiline]);

  // the descent of the font (half the distance for android)
  const descent = useMemo(() => {
    if (textHeight) {
      let heightDifference = textHeight - fontSize * scaleFactor;
      if (heightDifference > 0) {
        return Platform.OS === "ios"
          ? heightDifference
          : heightDifference * 0.5;
      }
      return undefined;
    }
    return undefined;
  }, [textHeight, fontSize]);

  // the caret to display on the text input
  const caret = isCaretVisible && (
    <View>
      <View style={styles.caret(textHeight)} />
    </View>
  );

  const handleChangeText = (text: string) => {
    // ensure only English alphabet characters (lower case) are submitted
    let validatedText = text.replace(/[^a-zA-Z]/g, "").toLowerCase();

    // initiate checks for whole word entry and potential auto-merges
    checkInputForAutoMerge(validatedText);

    // update word input in state
    dispatch(setWordInput(validatedText));
  };

  // the base props utilized by the text input
  const inputBaseProps: Partial<TextInputProps> = {
    value: value,
    onBlur: onBlur,
    onChangeText: handleChangeText,
    onFocus: onFocus,
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
