import { Pressable, View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./RestrictionsBlock.styles";
import Animated from "react-native-reanimated";
import { RESTRICTION_ITEM_HEIGHT } from "../RestrictionTextItem/RestrictionTextItem.styles";
import useRestrictionLists from "../../hooks/useRestrictionLists";
import { Ionicons } from "@expo/vector-icons";
import useExpandableContainer from "../../../../hooks/useExpandableContainer";

type Props = {};

// Create an animated version of the Icon Component
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

// the header area to display the restricted endings. If the player turn,
// will highlight restrictions which relate to the current input
const RestrictionsBlock = ({}: Props) => {
  const styles = useStyles(createStyles);

  // get the different lists of restricted endings to display in the component
  const { blockedEndings, regularEndings, fadedEndings } =
    useRestrictionLists();

  // animated style control for the restriction component layout
  const { toggleExpanded, onContentLayout, containerStyle, iconStyle } =
    useExpandableContainer({
      minHeight: RESTRICTION_ITEM_HEIGHT * 2,
      maxHeight: 300,
    });

  return (
    <Pressable onPress={toggleExpanded}>
      <Animated.View style={[styles.container, containerStyle]}>
        <View onLayout={onContentLayout}>
          <View style={styles.list}>{blockedEndings}</View>
          <View style={styles.list}>{regularEndings}</View>
          <View style={styles.list}>{fadedEndings}</View>
        </View>
        <AnimatedIcon name={"caret-down"} style={iconStyle} />
      </Animated.View>
    </Pressable>
  );
};

export default RestrictionsBlock;
