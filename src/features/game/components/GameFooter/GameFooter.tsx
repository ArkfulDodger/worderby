import { IconButton, Surface } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameFooter.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../components/atoms/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { selectIsMuted, toggleIsMuted } from "../../../../slices/systemSlice";
import useGameButtonProps from "../../hooks/useGameButtonProps";

export type Props = {};

// the footer for the game cycle
const GameFooter = ({}: Props) => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const isMuted = useAppSelector(selectIsMuted);
  const { onButtonPress, buttonText, isButtonDisabled } = useGameButtonProps();

  // toggle mute on mute press
  const onMutePress = () => dispatch(toggleIsMuted());

  // TODO: home button logic
  const onHomePress = () => console.log("home pressed");

  return (
    <Surface style={styles.footerContainer}>
      <SafeAreaView edges={["bottom"]} style={styles.footerContent}>
        <IconButton onPress={onHomePress} icon="home" />
        <Button onPress={onButtonPress} disabled={isButtonDisabled}>
          {buttonText}
        </Button>
        <IconButton
          onPress={onMutePress}
          icon={isMuted ? "volume-off" : "volume-high"}
        />
      </SafeAreaView>
    </Surface>
  );
};

export default GameFooter;
