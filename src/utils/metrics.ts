import { Dimensions } from "react-native";

// get width and height of device
const { width, height } = Dimensions.get("screen");

// set screen width and screen height based on detected orientation (portrait/landscape)
const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export default metrics;
