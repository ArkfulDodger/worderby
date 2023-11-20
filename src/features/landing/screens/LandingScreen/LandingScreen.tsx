import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./LandingScreen.styles";
import Button from "../../../../components/atoms/Button";
import useLoadNewGame from "../../../game/hooks/useLoadNewGame";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { loadDemoGame } from "../../../../slices/gameSlice";
import { GameMode } from "../../../game/enums";

type Props = {};

// the screen the user is brought to when newly opening the app
const LandingScreen = ({}: Props) => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const { loadSinglePlayerGame } = useLoadNewGame();

  const onDemoPress = () => {
    dispatch(loadDemoGame());
  };

  const onCompetitivePress = () => {
    loadSinglePlayerGame(GameMode.Competitive);
  };

  const onCasualPress = () => {
    loadSinglePlayerGame(GameMode.Casual);
  };

  return (
    <View style={styles.container}>
      <Button onPress={onDemoPress}>Demo</Button>
      <Button onPress={onCompetitivePress}>Competitive</Button>
      <Button onPress={onCasualPress}>Casual</Button>
    </View>
  );
};

export default LandingScreen;
