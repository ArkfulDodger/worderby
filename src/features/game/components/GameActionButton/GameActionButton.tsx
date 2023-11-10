import Button from "../../../../components/atoms/Button";
import useStyles from "../../../../hooks/useStyles";
import useGameButtonProps from "../../hooks/useGameButtonProps";
import NewGameModal from "../NewGameModal";
import { createStyles } from "./GameActionButton.styles";

type Props = {};

// the primary game button, controlling game progresion actions
const GameActionButton = ({}: Props) => {
  const styles = useStyles(createStyles);
  const {
    onButtonPress,
    buttonText,
    isButtonDisabled,
    newGameModalVisible,
    hideNewGameModal,
  } = useGameButtonProps();

  return (
    <>
      <Button onPress={onButtonPress} disabled={isButtonDisabled}>
        {buttonText}
      </Button>
      <NewGameModal
        visible={newGameModalVisible}
        hideModal={hideNewGameModal}
      />
    </>
  );
};

export default GameActionButton;
