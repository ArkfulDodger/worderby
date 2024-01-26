import { Circle, CircleProps, G, Svg } from "react-native-svg";
import Animated, {
  SharedValue,
  createAnimatedPropAdapter,
  interpolateColor,
  processColor,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import { TIMER_COUNT } from "../../../features/game/constants";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../../../utils/types";
import { useMemo } from "react";

type Props = {
  radius: number;
  progress: SharedValue<number>;
  timer: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
};

// Create an animated version of the Circle Component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);


// a circular progress bar which loops over itself over the course of a timer countdown
// Renders an actively progressing circle svg above a backdrop circle to "fade out" the previous
// progress bar will change color when progressing to negative values
const CircularProgressBar = ({ radius, progress, timer, style }: Props) => {
  const theme = useTheme() as AppTheme;
  const headerContainerColor = theme.colors.elevation.level1; // update GameHeader.styles if changed
  const positiveColorFaded = useMemo(() => interpolateColor(0.5, [0,1], [headerContainerColor, theme.colors.timerPositive]), [theme]);
  const negativeColorFaded = useMemo(() => interpolateColor(0.5, [0,1], [headerContainerColor, theme.colors.timerNegative]), [theme]);

  // the width of the progress bar line
  const strokeWidth = radius * 0.24;

  // the effective radius (center to center of stroke)
  const R = radius - strokeWidth * 0.5;

  // the effective circumference (along center of stroke)
  const circumference = 2 * Math.PI * R;

  // which color (positive/negative) is in place for the given circle
  const isActiveCirclePositive = useDerivedValue(() => timer.value > 0);
  const isBackCirclePositive = useDerivedValue(() => timer.value > -1);

  // the color of the active stroke, which "fades" over each progress interval
  const strokeColor = useDerivedValue<ColorValue | undefined>(() =>
    interpolateColor(
      progress.value,
      [0, 1],
      isActiveCirclePositive.value
        ? [positiveColorFaded, theme.colors.timerPositive]
        : [negativeColorFaded, theme.colors.timerNegative]
    )
  );

  // the color of the background stroke, which starts on the second cound to "fade" the first stroke
  const backstrokeColor = useDerivedValue<ColorValue | undefined>(() =>
    timer.value < TIMER_COUNT - 1
      ? isBackCirclePositive.value
        ? positiveColorFaded
        : negativeColorFaded
      : "transparent"
  );

  // the adapter function which allows svg & reanimated to properly convert color types
  // necessary to avoid Android crash
  const adapter = createAnimatedPropAdapter(
    (props) => {
      if (Object.keys(props).includes("fill")) {
        props.fill = {
          type: 0,
          payload: processColor(props.fill as string | number),
        };
      }
      if (Object.keys(props).includes("stroke")) {
        props.stroke = {
          type: 0,
          payload: processColor(props.stroke as string | number),
        };
      }
    },
    ["fill", "stroke"]
  );

  // the animated properties of the active stroke
  // animates the progress bar filling the circumference over time while fading
  const activeAnimatedProps = useAnimatedProps<CircleProps>(
    () => ({
      strokeDashoffset: circumference * progress.value,
      stroke: strokeColor.value,
    }),
    [],
    adapter
  );

  // the animated properties of the background stroke
  // animates the prior active stroke fading to 0 opacity
  const underAnimatedProps = useAnimatedProps<CircleProps>(
    () => ({
      opacity: progress.value,
      stroke: backstrokeColor.value,
    }),
    [],
    adapter
  );

  return (
    <Svg height={radius * 2} width={radius * 2} style={style}>
      <G rotation="-90" origin={`${radius},${radius}`}>
        <AnimatedCircle
          animatedProps={underAnimatedProps}
          cx={radius}
          cy={radius}
          r={R}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          animatedProps={activeAnimatedProps}
          strokeDasharray={circumference}
          strokeLinecap={"round"}
          cx={radius}
          cy={radius}
          r={R}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
      </G>
    </Svg>
  );
};

export default CircularProgressBar;
