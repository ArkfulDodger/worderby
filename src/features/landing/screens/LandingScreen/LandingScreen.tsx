import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./LandingScreen.styles";
import Button from "../../../../components/atoms/Button";
import useLoadNewGame from "../../../game/hooks/useLoadNewGame";
import { GameMode } from "../../../game/enums";
import { useRouter } from "expo-router";
import useWordList from "../../../../hooks/useWordList";

type Props = {};

// the screen the user is brought to when newly opening the app
const LandingScreen = ({}: Props) => {
  const styles = useStyles(createStyles);
  const { loadSinglePlayerGame } = useLoadNewGame();
  const router = useRouter();
  const { selectTables } = useWordList();

  const onDemoPress = () => {
    router.push("/game/demo");
  };

  const onCompetitivePress = async () => {
    await loadSinglePlayerGame(GameMode.Competitive);
    router.push({
      pathname: "/game/[id]",
      params: { id: GameMode.Competitive },
    });
  };

  const onCasualPress = async () => {
    await loadSinglePlayerGame(GameMode.Casual);
    router.push({
      pathname: "/game/[id]",
      params: { id: GameMode.Casual },
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={onDemoPress}>Demo</Button>
      <Button onPress={onCompetitivePress}>Competitive</Button>
      <Button onPress={onCasualPress}>Casual</Button>
      <Button onPress={selectTables}>Get Tables</Button>
    </View>
  );
};

export default LandingScreen;
