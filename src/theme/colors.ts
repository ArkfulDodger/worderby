import { CustomizedColors } from "../utils/types";

// light theme color palette
const light: CustomizedColors = {
  // background: "transparent",
  backgroundStart: "#FFFFFF",
  backgroundEnd: "#FFE2CD",
  backgroundMid: "#FFF0E6", // midway btw gradient top/bottom
  backgroundLight: "#fff6f2", // slightly lighter than midway
  player: "#dd00ff",
  opponent: "#c18617",
  positiveScore: "green",
  negativeScore: "red",
  alert: "red",
  // elevation: {
  //   level0: "transparent",
  //   level1: "#f3ddc8",
  //   level2: "red",
  //   level3: "#f2d2b4",
  //   level4: "#f2d2b4",
  //   level5: "#f2d2b4"
  // }  
  // secondary: "#FAC336",
  // focus: "#BC02D9",
  // accent: "#00ACB7",
};

// dark theme color palette
const dark: CustomizedColors = {
  // background: "transparent",
  backgroundStart: "#0a063b",
  backgroundEnd: "#000000",
  backgroundMid: "#05031e", // midway btw gradient top/bottom
  backgroundLight: "#0d0a36", // slightly lighter than midway
  player: "#e641ff",
  opponent: "#d6a851",
  // opponent: "#00ACB7",
  positiveScore: "green",
  negativeScore: "red",
  alert: "red"
  // elevation: {
  //   level0: "transparent",
  //   level1: "#f3ddc8",
  //   level2: "red",
  //   level3: "#f2d2b4",
  //   level4: "#f2d2b4",
  //   level5: "#f2d2b4"
  // }  
  // secondary: "#5943D8",
  // focus: "#C50EE1",
  // accent: "#00ACB7",
};

export const colors = { light: light, dark: dark };
