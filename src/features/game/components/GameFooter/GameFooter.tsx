import { IconButton, Surface } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameFooter.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../components/atoms/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { toggleIsMuted } from "../../../../reducers/systemReducer";

export type Props = {};

// the footer for the game cycle
const GameFooter = ({}: Props) => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const isMuted = useAppSelector((state) => state.system.isMuted);

  // toggle mute on mute press
  const onMutePress = () => dispatch(toggleIsMuted());

  // TODO: submit button logic
  const onSubmitPress = () => console.log("submit pressed");

  // TODO: home button logic
  const onHomePress = () => console.log("home pressed");

  return (
    <Surface style={styles.footerContainer}>
      <SafeAreaView edges={["bottom"]} style={styles.footerContent}>
        <IconButton onPress={onHomePress} icon="home" />
        <Button onPress={onSubmitPress}>SUBMIT</Button>
        <IconButton
          onPress={onMutePress}
          icon={isMuted ? "volume-off" : "volume-high"}
        />
      </SafeAreaView>
    </Surface>
  );
};

export default GameFooter;
