import {
  KeyboardAvoidingViewProps,
  KeyboardAvoidingView as NativeKeyboardAvoidingView,
  Platform,
} from "react-native";

export type Props = KeyboardAvoidingViewProps;

// a KeyboardAvoidingView which defaults its behavior based on platform
const KeyboardAvoidingView = (props: Props) => {
  const buttonProps: Props = {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    ...props,
  };

  return <NativeKeyboardAvoidingView {...buttonProps} />;
};

export default KeyboardAvoidingView;
