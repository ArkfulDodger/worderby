import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayerScoreBlock.styles";
import { Avatar, Text } from "react-native-paper";

export type Props = {
  isPlayer?: boolean;
};

const PlayerScoreBlock = ({ isPlayer = false }: Props) => {
  const styles = useStyles(createStyles, isPlayer, [isPlayer]);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.score]}>{isPlayer ? 404 : 666}</Text>
      <View style={styles.playerInfo}>
        <Avatar.Icon icon="account" style={styles.avatar} size={20} />
        <Text numberOfLines={1} style={styles.playerName}>
          {isPlayer ? "John" : "Jane"} Doe
        </Text>
      </View>
    </View>
  );
};

export default PlayerScoreBlock;
