import { View, FlatList, ListRenderItem } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./ResultsFrame.styles";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectStartingWord, selectTurns } from "../../gameSelectors";
import { Turn } from "../../../../slices/gameSlice";
import TurnListItem from "../../components/TurnListItem";
import { Text } from "react-native-paper";

type Props = {};

const ResultsFrame = ({}: Props) => {
  const styles = useStyles(createStyles);
  const startingWord = useAppSelector(selectStartingWord);
  const turns = useAppSelector(selectTurns);

  const renderTurnListItem: ListRenderItem<Turn> = ({ item: turn }) => (
    <TurnListItem key={turn.turnNumber} turn={turn} />
  );

  return (
    <View>
      {/* <VictoryMessage /> */}
      <FlatList
        data={turns}
        renderItem={renderTurnListItem}
        ListHeaderComponent={() => (
          <Text style={styles.startingWord}>{startingWord}</Text>
        )}
      />
    </View>
  );
};

export default ResultsFrame;
