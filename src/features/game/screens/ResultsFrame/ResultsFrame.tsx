import { View, FlatList, ListRenderItem } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./ResultsFrame.styles";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectStartingWord, selectTurns } from "../../gameSelectors";
import { Turn } from "../../../../store/slices/gameSlice";
import TurnListItem from "../../components/TurnListItem";
import { Text } from "react-native-paper";
import VictoryMessage from "../../components/VictoryMessage";

type Props = {};

const ResultsFrame = ({}: Props) => {
  const styles = useStyles(createStyles);
  const startingWord = useAppSelector(selectStartingWord);
  const turns = useAppSelector(selectTurns);

  const renderTurnListItem: ListRenderItem<Turn> = ({ item: turn }) => (
    <TurnListItem key={turn.turnNumber} turn={turn} />
  );

  return (
    <View style={styles.container}>
      <VictoryMessage />
      <FlatList
        style={styles.list}
        data={turns}
        renderItem={renderTurnListItem}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <Text style={styles.startingWord}>{startingWord}</Text>
        )}
      />
    </View>
  );
};

export default ResultsFrame;
