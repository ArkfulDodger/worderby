import { forwardRef } from "react";
import { View } from "react-native";
import { ButtonProps, Button as PaperButton } from "react-native-paper";

const Button = forwardRef<View, ButtonProps>((props: ButtonProps, ref) => {
  const buttonProps: ButtonProps = {
    mode: "contained",
    uppercase: false,
    ...props,
  };

  return <PaperButton {...buttonProps} ref={ref} />;
});

export default Button;
