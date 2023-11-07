import { ButtonProps, Button as PaperButton } from "react-native-paper";

const Button = (props: ButtonProps) => {
  const buttonProps: ButtonProps = {
    mode: "contained",
    uppercase: false,
    ...props,
  };

  return <PaperButton {...buttonProps} />;
};

export default Button;
