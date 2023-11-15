import { LayoutChangeEvent, Pressable, View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./RestrictionsBlock.styles";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { RESTRICTION_ITEM_HEIGHT } from "../RestrictionTextItem/RestrictionTextItem.styles";
import useRestrictionLists from "../../hooks/useRestrictionLists";

type Props = {};

// the header area to display the restricted endings. If the player turn,
// will highlight restrictions which relate to the current input
const RestrictionsBlock = ({}: Props) => {
  const styles = useStyles(createStyles);

  // get the different lists of restricted endings to display in the component
  const { blockedEndings, regularEndings, fadedEndings } =
    useRestrictionLists();

  // animated style control for the restriction component layout
  const containerHeight = useSharedValue(RESTRICTION_ITEM_HEIGHT * 2);
  const containerStyles = useAnimatedStyle(() => ({
    height: containerHeight.value,
  }));
  const [isCentered, setIsCentered] = useState(false);
  const onLayout = (e: LayoutChangeEvent) => {
    if (e.nativeEvent.layout.height >= RESTRICTION_ITEM_HEIGHT * 2) {
      setIsCentered(false);
    } else {
      setIsCentered(true);
    }
  };

  return (
    <Pressable>
      <Animated.View style={[styles.container(isCentered), containerStyles]}>
        <View onLayout={onLayout}>
          <View style={styles.list}>{blockedEndings}</View>
          <View style={styles.list}>{regularEndings}</View>
          <View style={styles.list}>{fadedEndings}</View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default RestrictionsBlock;
