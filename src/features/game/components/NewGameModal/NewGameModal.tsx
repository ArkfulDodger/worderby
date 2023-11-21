import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./NewGameModal.styles";
import Modal from "../../../../components/molecules/Modal";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectMode } from "../../gameSelectors";
import { GameMode } from "../../enums";
import DemoGameEndMessage from "../DemoGameEndMessage";
import PlayAgainMessage from "../PlayAgainMessage";
import useLoadNewGame from "../../hooks/useLoadNewGame";

type Props = {
  visible: boolean;
  hideModal: () => void;
};

// the pop-up providing options for continuing play post-game
const NewGameModal = ({ visible, hideModal }: Props) => {
  const styles = useStyles(createStyles);
  const mode = useAppSelector(selectMode);
  const { continueDemoGame, loadSinglePlayerGame, continueSinglePlayerGame } =
    useLoadNewGame();

  return (
    <Modal visible={visible} onDismiss={hideModal}>
      {mode === GameMode.Demo ? (
        <DemoGameEndMessage onContinue={continueDemoGame} />
      ) : (
        <PlayAgainMessage
          onContinue={continueSinglePlayerGame}
          onReset={() => loadSinglePlayerGame(mode)}
        />
      )}
    </Modal>
  );
};

export default NewGameModal;
