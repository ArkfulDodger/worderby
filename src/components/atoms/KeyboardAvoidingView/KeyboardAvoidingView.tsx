import {
  KeyboardAvoidingViewProps,
  KeyboardAvoidingView as NativeKeyboardAvoidingView,
  Platform,
} from "react-native";

// a KeyboardAvoidingView which defaults its behavior based on platform
const KeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
  const keyboardAvoidingViewProps: KeyboardAvoidingViewProps = {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    ...props,
  };

  return <NativeKeyboardAvoidingView {...keyboardAvoidingViewProps} />;
};

export default KeyboardAvoidingView;
