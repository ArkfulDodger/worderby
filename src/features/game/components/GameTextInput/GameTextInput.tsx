import { Platform, TextInput, TextInputProps, View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameTextInput.styles";
import { useEffect } from "react";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useAutoMerge from "../../hooks/useAutoMerge";
import { setWordInput } from "../../../../slices/gameSlice";
import { selectIsWordSplit } from "../../gameSelectors";
import TextInputFacade from "../TextInputFacade";
import useGameInputFocus from "../../hooks/useGameInputFocus";
import useBlurOnKeyboardDismiss from "../../hooks/useBlurOnKeyboardDismiss";
import useGameInputLayout from "../../hooks/useGameInputLayout";
import useCaretControl from "../../hooks/useCaretControl";
import usePlayTurn from "../../hooks/usePlayTurn";

type Props = TextInputProps & {
  fontSize?: number;
};

// The text input component used during gameplay
// Dynamically switches between a single or multiline input based on split word state
// for single line, displays "false" non-flickering input facade over invisible active text input
const GameTextInput = ({ fontSize = 30, style, value, ...props }: Props) => {
  const styles = useStyles(createStyles, fontSize);
  const { colors } = useTheme() as AppTheme;

  useBlurOnKeyboardDismiss();
  const dispatch = useAppDispatch();
  const multiline = useAppSelector(selectIsWordSplit);
  const { checkInputForAutoMerge } = useAutoMerge();
  const { attemptWord } = usePlayTurn();
  const { textHeight, onTextHeightLayout, hasRendered, onComponentRender } =
    useGameInputLayout();
  const { caretIndex, isCaretVisible, handleSelectionChange } =
    useCaretControl();
  const {
    inputRef,
    multilineInputRef,
    canFocus,
    enableFocus,
    focusStateOnInputFocus,
    blurStateOnFullInputBlur,
  } = useGameInputFocus();

  // once all necessary components have measured and rendered, allow input focus
  // avoids layout error from keyboard being open prior to measuring
  useEffect(() => {
    if (hasRendered && textHeight && !canFocus) enableFocus();
  }, [hasRendered, textHeight]);

  // on text change, validate, check whole-word entry, and update input in state
  const onChangeText = (text: string) => {
    let validatedText = text.replace(/[^a-zA-Z]/g, "").toLowerCase(); // ensure only English alphabet characters (lower case)
    checkInputForAutoMerge(validatedText);
    dispatch(setWordInput(validatedText));
  };

  // the base props utilized by both text inputs
  const inputBaseProps: Partial<TextInputProps> = {
    value: value,
    onChangeText: onChangeText,
    onFocus: focusStateOnInputFocus,
    onBlur: blurStateOnFullInputBlur,
    autoFocus: false,
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: false,
    blurOnSubmit: multiline,
    contextMenuHidden: true,
    disableFullscreenUI: true, // android
    enablesReturnKeyAutomatically: true, // ios
    importantForAutofill: "no", // android
    keyboardType: "ascii-capable", // ios
    maxLength: 44, // longest english word is 45 letters
    returnKeyType: "go",
    selectTextOnFocus: false,
    onSubmitEditing: attemptWord,
  };

  return (
    <View onLayout={onComponentRender} style={styles.container(multiline)}>
      {!multiline && (
        <TextInputFacade
          value={value}
          textHeight={textHeight}
          fontSize={fontSize}
          isCaretVisible={isCaretVisible}
          caretIndex={caretIndex}
          style={style}
        />
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
        onLayout={onTextHeightLayout}
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
