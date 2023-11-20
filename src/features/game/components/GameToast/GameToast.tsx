import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameToast.styles";
import Toast from "react-native-toast-notifications";

type Props = {};

// the toast element for use in the game cycle
// to be placed in the game frame area so it displays under the header
const GameToast = ({}: Props) => {
  const styles = useStyles(createStyles);

  return <Toast ref={(ref) => (global["gameToast"] = ref)} />;
};

export default GameToast;
