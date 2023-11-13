import { Circle, G, Svg } from "react-native-svg";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./CircularProgressBar.styles";

type Props = {
  radius: number;
  progress: number;
};

const CircularProgressBar = ({ radius, progress }: Props) => {
  const styles = useStyles(createStyles);

  const circumference = 2 * Math.PI * radius;
  const progressValue = (circumference * progress) / 100;

  return (
    <Svg height={radius * 2} width={radius * 2}>
      <G rotation="-90" origin={`${radius},${radius}`}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={5}
          fill="transparent"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          stroke="#42a5f5"
          strokeWidth={5}
          strokeDasharray={[progressValue, circumference]}
          fill="transparent"
        />
      </G>
    </Svg>
  );
};

export default CircularProgressBar;
