import { IconButton, Surface } from "react-native-paper";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./GameFooter.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectIsMuted,
  toggleIsMuted,
} from "../../../../store/slices/systemSlice";
import GameActionButton from "../GameActionButton";

// the footer for the game cycle
const GameFooter = () => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const isMuted = useAppSelector(selectIsMuted);

  // toggle mute on mute press
  const onMutePress = () => dispatch(toggleIsMuted());

  // TODO: home button logic
  const onHomePress = () => console.log("home pressed");

  return (
    <Surface style={styles.footerContainer}>
      <SafeAreaView edges={["bottom"]} style={styles.footerContent}>
        <IconButton onPress={onHomePress} icon="home" />
        <GameActionButton />
        <IconButton
          onPress={onMutePress}
          icon={isMuted ? "volume-off" : "volume-high"}
        />
      </SafeAreaView>
    </Surface>
  );
};

export default GameFooter;
