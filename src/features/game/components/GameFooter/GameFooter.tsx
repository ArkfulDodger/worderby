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
import { selectRoundPhase } from "../../gameSelectors";
import { RoundPhase } from "../../enums";
import { useRouter } from "expo-router";

// the footer for the game cycle
const GameFooter = () => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const phase = useAppSelector(selectRoundPhase);
  const isMuted = useAppSelector(selectIsMuted);
  const router = useRouter();

  // toggle mute on mute press
  const onMutePress = () => dispatch(toggleIsMuted());

  // TODO: home button logic
  const onHomePress = () => router.replace("/");

  return (
    <Surface style={styles.footerContainer}>
      <SafeAreaView edges={["bottom"]} style={styles.footerContent}>
        <IconButton
          onPress={onHomePress}
          disabled={phase === RoundPhase.PlayerTurn}
          icon="home"
        />
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
