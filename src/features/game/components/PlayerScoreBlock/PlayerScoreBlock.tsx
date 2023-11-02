import { PixelRatio, StyleProp, View, ViewStyle } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./PlayerScoreBlock.styles";
import { Avatar, Text } from "react-native-paper";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { getGameScore } from "../../../../utils/helpers";
import { useMemo } from "react";

export type Props = {
  isPlayer?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PlayerScoreBlock = ({ isPlayer = false, style }: Props) => {
  const scaleFactor = PixelRatio.getFontScale();
  const styles = useStyles(createStyles, isPlayer, [isPlayer, scaleFactor]);
  const game = useAppSelector((state) => state.game);

  const avatarSize = 20 * scaleFactor;

  // get player/opponent score
  const score = useMemo(
    () => getGameScore(game.turns, isPlayer),
    [game.turns, isPlayer]
  );

  // get player/opponent name and avatar
  const name = isPlayer ? "Name" : game.opponent.name;
  const avatar = isPlayer ? undefined : game.opponent.avatar;

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
