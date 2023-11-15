import { Circle, CircleProps, G, Svg } from "react-native-svg";
import Animated, {
  SharedValue,
  createAnimatedPropAdapter,
  interpolateColor,
  processColor,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { ColorValue } from "react-native";
import { TIMER_COUNT } from "../../../features/game/constants";

type Props = {
  radius: number;
  progress: SharedValue<number>;
  timer: SharedValue<number>;
};

// Create an animated version of the Circle Component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// The colors for the progress timer
const POSITIVE_COLOR = "#1f92f0";
const POSITIVE_COLOR_FADED = "#98cbf5";
const NEGATIVE_COLOR = "#e61934";
const NEGATIVE_COLOR_FADED = "#e37685";

// a circular progress bar which loops over itself over the course of a timer countdown
// Renders an actively progressing circle svg above a backdrop circle to "fade out" the previous
// progress bar will change color when progressing to negative values
const CircularProgressBar = ({ radius, progress, timer }: Props) => {
  // the width of the progress bar line
  const strokeWidth = 6;

  // the effective radius (center to center of stroke)
  const R = radius - strokeWidth * 0.5;

  // the effective circumference (along center of stroke)
  const circumference = 2 * Math.PI * R;

  // which color (positive/negative) is in place for the given circle
  const isActiveCirclePositive = useDerivedValue(() => timer.value > -1);
  const isBackCirclePositive = useDerivedValue(() => timer.value > -2);

  // the color of the active stroke, which "fades" over each progress interval
  const strokeColor = useDerivedValue<ColorValue | undefined>(() =>
    interpolateColor(
      progress.value,
      [0, 1],
      isActiveCirclePositive.value
        ? [POSITIVE_COLOR_FADED, POSITIVE_COLOR]
        : [NEGATIVE_COLOR_FADED, NEGATIVE_COLOR]
    )
  );

  // the color of the background stroke, which starts on the second cound to "fade" the first stroke
  const backstrokeColor = useDerivedValue<ColorValue | undefined>(() =>
    timer.value < TIMER_COUNT - 1
      ? isBackCirclePositive.value
        ? POSITIVE_COLOR_FADED
        : NEGATIVE_COLOR_FADED
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
    <Svg height={radius * 2} width={radius * 2}>
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
