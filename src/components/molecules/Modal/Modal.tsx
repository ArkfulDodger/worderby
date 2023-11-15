import { ModalProps, Portal, Modal as RNModal } from "react-native-paper";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./Modal.styles";

// a modal component which is wrapped in a portal and has default stylings
const Modal = ({ style, contentContainerStyle, ...props }: ModalProps) => {
  const styles = useStyles(createStyles);

  return (
    <Portal>
      <RNModal
        style={[styles.modal, style]}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        {...props}
      />
    </Portal>
  );
};

export default Modal;
