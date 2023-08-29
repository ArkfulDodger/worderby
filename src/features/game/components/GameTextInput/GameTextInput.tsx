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

const AUTO_FOCUS = Platform.OS !== "android"; // leave off to fix Android Keyboard Padding Issue

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

  // useEffect(() => {
  //   const listener = Keyboard.addListener("keyboardWillHide", (e) => {
  //     Keyboard.
  //   })
  // }, [])

  // the height of the text, including padding
  const [textHeight, setTextHeight] = useState<number>();

  // whether to show the caret
  const [caretIndex, setCaretIndex] = useState(0);
  const [isCaretVisible, setIsCaretVisible] = useState(AUTO_FOCUS);
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

  // switch inputs from single to multiline if on ios
  useEffect(() => {
    if (Platform.OS !== "ios") return;

    if (multiline) {
      multilineInputRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [multiline]);

  return (
    <View style={[containerStyle, { overflow: "visible" }]}>
      {descent && !multiline && <View style={styles.underline(descent)} />}
      {!multiline && (
        <View style={styles.mockInputContainer(textHeight)}>
          <Text selectable={false} style={[styles.text, style]}>
            {value?.slice(0, caretIndex) || ""}
          </Text>
          {caret}
          <Text selectable={false} style={[styles.text, style]}>
            {value?.slice(caretIndex) || ""}
          </Text>
        </View>
      )}
      {Platform.OS === "ios" && (
        <>
          <TextInput
            ref={inputRef}
            value={value}
            multiline={false}
            numberOfLines={1}
            // pointerEvents={multiline ? "box-none" : "auto"}
            style={[
              styles.text,
              style,
              styles.hiddenInput,
              multiline ? styles.hiddenMultiline : undefined,
            ]}
            autoFocus={!multiline}
            caretHidden={true}
            cursorColor={!multiline ? colors.outline : "transparent"}
            onSelectionChange={multiline ? undefined : handleSelectionChange}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            blurOnSubmit={false}
            contextMenuHidden={true}
            disableFullscreenUI // android
            enablesReturnKeyAutomatically // ios
            importantForAutofill="no" // android
            keyboardType="ascii-capable" // ios
            maxLength={44} // longest english word is 45 letters
            onBlur={hideCaret}
            onChangeText={handleChangeText}
            onFocus={showCaret}
            onLayout={(e) => setTextHeight(e.nativeEvent.layout.height)}
            returnKeyType="go"
            selectTextOnFocus={false}
            {...props}
          />
          <TextInput
            ref={multilineInputRef}
            // pointerEvents={multiline ? "auto" : "box-none"}
            value={value}
            multiline={true}
            numberOfLines={multiline ? 3 : 1}
            style={[
              styles.text,
              style,
              styles.multiline,
              styles.multilinePadding,
              multiline ? undefined : styles.hiddenMultiline,
            ]}
            autoFocus={multiline}
            caretHidden={!multiline}
            cursorColor={multiline ? colors.outline : "transparent"}
            onSelectionChange={multiline ? handleSelectionChange : undefined}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            blurOnSubmit={false}
            contextMenuHidden={true}
            disableFullscreenUI // android
            enablesReturnKeyAutomatically // ios
            importantForAutofill="no" // android
            keyboardType="ascii-capable" // ios
            maxLength={44} // longest english word is 45 letters
            onBlur={hideCaret}
            onChangeText={handleChangeText}
            onFocus={showCaret}
            returnKeyType="go"
            selectTextOnFocus={false}
            {...props}
          />
        </>
      )}
      {Platform.OS !== "ios" && (
        <TextInput
          ref={inputRef}
          value={value}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          style={[
            styles.text,
            style,
            multiline ? styles.multiline : styles.hiddenInput,
          ]}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          autoFocus={AUTO_FOCUS}
          blurOnSubmit={false}
          caretHidden={!multiline}
          contextMenuHidden={true}
          cursorColor={multiline ? colors.outline : "transparent"}
          disableFullscreenUI // android
          enablesReturnKeyAutomatically // ios
          importantForAutofill="no" // android
          keyboardType="ascii-capable" // ios
          maxLength={44} // longest english word is 45 letters
          onBlur={hideCaret}
          onChangeText={handleChangeText}
          onFocus={showCaret}
          onLayout={(e) => setTextHeight(e.nativeEvent.layout.height)}
          onSelectionChange={handleSelectionChange}
          returnKeyType="go"
          selectTextOnFocus={false}
          {...props}
        />
      )}
    </View>
  );
};

export default GameTextInput;
