import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayerScoreBlock.styles";
import { Avatar, Text } from "react-native-paper";

export type Props = {
  isPlayer1?: boolean;
};

const PlayerScoreBlock = ({ isPlayer1 = false }: Props) => {
  const styles = useStyles(createStyles, isPlayer1, [isPlayer1]);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.score]}>{isPlayer1 ? 404 : 666}</Text>
      <View style={styles.playerInfo}>
        <Avatar.Icon icon="account" style={styles.avatar} size={20} />
        <Text numberOfLines={1} style={styles.playerName}>
          {isPlayer1 ? "John" : "Jane"} Doe
        </Text>
      </View>
    </View>
  );
};

export default PlayerScoreBlock;
