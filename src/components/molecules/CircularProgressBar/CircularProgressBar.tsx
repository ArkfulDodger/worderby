import { Circle, CircleProps, G, Svg } from "react-native-svg";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./CircularProgressBar.styles";
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

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = ({ radius, progress, timer }: Props) => {
  const styles = useStyles(createStyles);

  const negativeColor = "#e61934";

  const primaryColor = "#1f92f0";
  const fadedPrimary = "#98cbf5";
  const fadedNegative = "#e37685";

  const activePos = useDerivedValue(() => timer.value > -1);
  const activeBack = useDerivedValue(() => timer.value > -2);

  const R = radius - 3;
  const circumference = 2 * Math.PI * R;

  // const backstrokeColor = useDerivedValue<ColorValue | undefined>(() =>
  //   interpolateColor(
  //     1,
  //     [0, 1],
  //     activeBack.value
  //       ? [fadedPrimary, fadedPrimary]
  //       : [fadedNegative, fadedNegative]
  //   )
  // );

  const backstrokeColor = useDerivedValue<ColorValue | undefined>(() =>
    timer.value < TIMER_COUNT - 1
      ? activeBack.value
        ? fadedPrimary
        : fadedNegative
      : "transparent"
  );

  const strokeColor = useDerivedValue<ColorValue | undefined>(() =>
    interpolateColor(
      progress.value,
      [0, 1],
      activePos.value
        ? [fadedPrimary, primaryColor]
        : [fadedNegative, negativeColor]
    )
  );

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

  const underAnimatedProps = useAnimatedProps<CircleProps>(
    () => ({
      opacity: progress.value,
      stroke: backstrokeColor.value,
      // stroke: backstrokeColor.value,
    }),
    [],
    adapter
  );

  const animatedProps = useAnimatedProps<CircleProps>(
    () => ({
      strokeDashoffset: circumference * progress.value,
      stroke: strokeColor.value,
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
          strokeWidth={6}
          fill="transparent"
        />
        <AnimatedCircle
          animatedProps={animatedProps}
          strokeDasharray={circumference}
          strokeLinecap={"round"}
          cx={radius}
          cy={radius}
          r={R}
          strokeWidth={6}
          fill="transparent"
        />
      </G>
    </Svg>
  );
};

export default CircularProgressBar;
