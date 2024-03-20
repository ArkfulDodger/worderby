import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./LandingScreen.styles";
import Button from "../../../../components/atoms/Button";
import useLoadNewGame from "../../../game/hooks/useLoadNewGame";
import { GameMode } from "../../../game/enums";
import { useRouter } from "expo-router";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectDevLogs,
  selectIsLoadingDb,
} from "../../../../store/slices/systemSlice";
import { ActivityIndicator, Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

type Props = {};

// the screen the user is brought to when newly opening the app
const LandingScreen = ({}: Props) => {
  const styles = useStyles(createStyles);
  const { loadSinglePlayerGame } = useLoadNewGame();
  const router = useRouter();
  const isDbLoading = useAppSelector(selectIsLoadingDb);
  const devLogs = useAppSelector(selectDevLogs);

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
      {/* <Button onPress={onDemoPress}>Demo</Button> */}
      {isDbLoading && (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator />
          <Text>Database is loading...</Text>
        </View>
      )}
      {true && (
        <View>
          <Text>Logs</Text>
          <View
            style={{
              height: 200,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <ScrollView contentContainerStyle={{ rowGap: 10 }}>
              {devLogs.map((log, i) => (
                <Text numberOfLines={2} key={i.toString()}>
                  {log}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
      <Button onPress={onCompetitivePress}>Competitive</Button>
      <Button onPress={onCasualPress}>Casual</Button>
    </View>
  );
};

export default LandingScreen;
