import { ButtonProps, Button as PaperButton } from "react-native-paper";

export type Props = ButtonProps;

const Button = (props: Props) => {
  const buttonProps: Props = {
    mode: "contained",
    uppercase: false,
    ...props,
  };

  return <PaperButton {...buttonProps} />;
};

export default Button;
