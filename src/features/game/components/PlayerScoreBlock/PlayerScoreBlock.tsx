import { PixelRatio, StyleProp, View, ViewStyle } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayerScoreBlock.styles";
import { Avatar, Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import {
  selectOpponent,
  selectOpponentScore,
  selectUserScore,
} from "../../gameSelectors";

type Props = {
  isPlayer?: boolean;
  style?: StyleProp<ViewStyle>;
};

// displays the score, name, and avatar for a player in the game cycle
// isPlayer prop determines styling layout and content source
const PlayerScoreBlock = ({ isPlayer = false, style }: Props) => {
  const scaleFactor = PixelRatio.getFontScale();
  const styles = useStyles(createStyles, isPlayer, [scaleFactor]);
  const score = useAppSelector(
    isPlayer ? selectUserScore : selectOpponentScore
  );
  const opponent = useAppSelector(selectOpponent);

  // the size of the avatar (scaling with text scale)
  const avatarSize = 20 * scaleFactor;

  // get player/opponent name and avatar
  const name = isPlayer ? "Name" : opponent.name;
  const avatar = isPlayer ? undefined : opponent.avatar;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.score]}>{score}</Text>
      <View style={styles.playerInfo}>
        {!avatar ? (
          <Avatar.Icon icon="account" style={styles.avatar} size={avatarSize} />
        ) : (
          <Avatar.Icon icon="circle" style={styles.avatar} size={avatarSize} />
        )}
        <Text numberOfLines={1} style={styles.playerName}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default PlayerScoreBlock;
