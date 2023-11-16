import {
  AnimatableNumericValue,
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { fontScaled } from "../utils/helpers";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../utils/types";
import { useState } from "react";

type Props = {
  minHeight: number;
  maxHeight: number;
};

const ICON_SIZE = fontScaled(16);
const ICON_PADDING = 5;
const ANIM_TIME_MS = 300;

// control for a container which can be expanded/contracted when its content height exceeds its minimum height
// onLayout is applied to the container which should measure content height
// animated styles are applied to the dynamic container and the optional arrow indicator icon
const useExpandableContainer = ({ minHeight, maxHeight }: Props) => {
  const theme = useTheme() as AppTheme;

  // the effective animated height of the container
  const containerHeight = useSharedValue(minHeight);

  // the current height of the content of the container
  const contentHeight = useSharedValue(minHeight);

  // whether or not the container is expanded
  const isExpanded = useSharedValue(false);

  // the animatable scale Y value for the indicator arrow icon, so it can be flipped
  const iconScaleY = useSharedValue<AnimatableNumericValue>(1);

  // a JS State to track if the container's flexbox is centered
  // flex cannot be animated, so must track and update with state
  const [isCenteredState, setIsCenteredState] = useState(true);
  const updateCentering = (isCentered: boolean) =>
    setIsCenteredState(isCentered);

  // the content justification, centered if content is smaller than min height
  const isCentered = useDerivedValue(() => {
    if (contentHeight.value < minHeight && !isExpanded.value) return true;
    else return false;
  });

  // when the animated centering value changes, ensure JS centering state matches
  useAnimatedReaction(
    () => isCentered.value,
    (newValue, oldValue) => {
      if (newValue !== isCenteredState) runOnJS(updateCentering)(newValue);
    }
  );

  // the height the container ought to be at, given current settings
  const targetContainerHeight = useDerivedValue(() => {
    if (isExpanded.value) {
      // if expanded, the height should be the content height, clamped to min/max
      return Math.max(minHeight, Math.min(maxHeight, contentHeight.value));
    } else {
      // if not expanded, the container should be at its minimum default height
      return minHeight;
    }
  });

  // whether the container expansion can be toggled
  // yes if content is larger than min container or
  // if the content is small enough to fit in the minimized container, but the container is still expanded
  const canToggle = useDerivedValue(() => {
    if (
      contentHeight.value > minHeight ||
      (contentHeight.value <= minHeight && containerHeight.value > minHeight)
    ) {
      console.log("can toggle/show icon");
      return true;
    } else {
      console.log("cannot toggle/hide icon");
      return false;
    }
  });

  // respond to changes in the target height of the container by animating to the new height
  useAnimatedReaction(
    () => targetContainerHeight.value,
    (newResult, oldResult) => {
      if (oldResult !== newResult) {
        // if the target container height has changed stop any current animation
        cancelAnimation(containerHeight);

        // if the container is not currently the target height, animate the change
        if (containerHeight.value !== newResult) {
          containerHeight.value = withTiming(newResult, {
            duration: ANIM_TIME_MS,
          });
        }
      }
    }
  );

  // if the container can no longer be toggled, ensure it is not expanded
  useAnimatedReaction(
    () => canToggle.value,
    (newVal, oldVal) => {
      if (!newVal && isExpanded.value) isExpanded.value = false;
    }
  );

  // if the container's expanded status changes, flip the icon to the appropriate direction
  useAnimatedReaction(
    () => isExpanded.value,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        cancelAnimation(iconScaleY);
        iconScaleY.value = withTiming(newVal ? -1 : 1, {
          duration: ANIM_TIME_MS,
        });
      }
    }
  );

  // the animated style to control the height of the container
  const animatedContainerStyle = useAnimatedStyle<ViewStyle>(() => ({
    // enforce the height as being the animated container height value
    height: containerHeight.value,
  }));

  // the animated style for the arrow indicator icon
  const animatedIconStyle = useAnimatedStyle<TextStyle>(() => ({
    // hide the icon if the user cannot toggle
    opacity: canToggle.value ? 1 : 0,
    // use animated scaleY to animate flip when switching
    transform: [{ scaleY: iconScaleY.value }],
  }));

  const staticStyles = StyleSheet.create<{
    container: ViewStyle;
    icon: TextStyle;
  }>({
    container: {
      // ensure content does not cover arrow icon
      paddingHorizontal: ICON_SIZE + ICON_PADDING * 2,
      // align content to center if it is smaller than the container (and not expanded), otherwise, align to top
      justifyContent: isCenteredState ? "center" : "flex-start",
      // hide overflow so content is not seen until expanded
      overflow: "hidden",
    },
    icon: {
      // position the icon according to padding and icon size
      position: "absolute",
      right: ICON_PADDING,
      bottom: ICON_PADDING,
      fontSize: ICON_SIZE,
    },
  });

  // the onLayout to use on the content container (for determining content height)
  const onContentLayout = (e: LayoutChangeEvent) => {
    contentHeight.value = e.nativeEvent.layout.height;
  };

  // toggle whether the container is expanded
  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
  };

  return {
    containerStyle: [animatedContainerStyle, staticStyles.container],
    iconStyle: [animatedIconStyle, staticStyles.icon],
    onContentLayout,
    toggleExpanded,
  };
};

export default useExpandableContainer;
