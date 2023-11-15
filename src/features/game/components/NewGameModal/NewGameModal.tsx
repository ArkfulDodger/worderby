import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./NewGameModal.styles";
import Modal from "../../../../components/molecules/Modal";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectMode } from "../../gameSelectors";
import { GameMode } from "../../enums";
import DemoGameEndMessage from "../DemoGameEndMessage";
import PlayAgainMessage from "../PlayAgainMessage";

type Props = {
  visible: boolean;
  hideModal: () => void;
};

// the pop-up providing options for continuing play post-game
const NewGameModal = ({ visible, hideModal }: Props) => {
  const styles = useStyles(createStyles);
  const mode = useAppSelector(selectMode);

  return (
    <Modal visible={visible} onDismiss={hideModal}>
      {mode === GameMode.Demo ? <DemoGameEndMessage /> : <PlayAgainMessage />}
    </Modal>
  );
};

export default NewGameModal;
