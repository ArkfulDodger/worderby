import { Circle, CircleProps, G, Svg } from "react-native-svg";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./CircularProgressBar.styles";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";

type Props = {
  radius: number;
  progress: SharedValue<number>;
  timer: SharedValue<number>;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = ({ radius, progress, timer }: Props) => {
  const styles = useStyles(createStyles);

  const primaryColor = "#1f92f0";
  const fadedPrimary = "#98cbf5";
  const negativeColor = "#e61934";
  const fadedNegative = "#e37685";

  const R = radius - 3;
  const circumference = 2 * Math.PI * R;

  const activePos = useDerivedValue(() => timer.value > -1);
  const activeBack = useDerivedValue(() => timer.value > -2);

  const underAnimatedProps = useAnimatedProps<CircleProps>(() => ({
    opacity: progress.value,
    stroke: interpolateColor(
      1,
      [0, 1],
      activeBack.value
        ? [fadedPrimary, fadedPrimary]
        : [fadedNegative, fadedNegative]
    ),
  }));

  const animatedProps = useAnimatedProps<CircleProps>(() => ({
    strokeDashoffset: circumference * progress.value,
    stroke: interpolateColor(
      progress.value,
      [0, 1],
      activePos.value
        ? [fadedPrimary, primaryColor]
        : [fadedNegative, negativeColor]
    ),
  }));

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
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
          cx={radius}
          cy={radius}
          r={R}
          // stroke="blue"
          strokeWidth={6}
          fill="transparent"
        />
      </G>
    </Svg>
  );
};

export default CircularProgressBar;
