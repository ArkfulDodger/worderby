import { LinearGradientProps } from "expo-linear-gradient";
import { AppTheme } from "../utils/types";

export type GradientProps = Pick<
  LinearGradientProps,
  "colors" | "locations" | "start" | "end"
>;

// export const spectatorGradient: () => GradientProps = {
//   colors: ["#731573", "#a239a2", "#d330d3"],
//   start: { x: 0.45, y: 1 },
//   end: { x: 0.5, y: 0 },
//   locations: [0, 0.7, 1],
// };

export const bgGradient = (theme: AppTheme): GradientProps => ({
  colors: [theme.colors.backgroundStart, theme.colors.backgroundEnd],
  start: { x: 0.5, y: 1},
  end: { x: 0.5, y: 0},
  locations: [0, 1]
})