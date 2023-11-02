import { IconButton, Surface } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameFooter.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../components/atoms/Button";

export type Props = {};

// the footer for the game cycle
const GameFooter = ({}: Props) => {
  const styles = useStyles(createStyles);

  // TODO: use actual state-stored settings
  const isMuted = false;

  // TODO: submit button logic

  // TODO: home button logic

  return (
    <Surface style={styles.footerContainer}>
      <SafeAreaView edges={["bottom"]} style={styles.footerContent}>
        <IconButton icon="home" />
        <Button>SUBMIT</Button>
        <IconButton icon={isMuted ? "volume-off" : "volume-high"} />
      </SafeAreaView>
    </Surface>
  );
};

export default GameFooter;
