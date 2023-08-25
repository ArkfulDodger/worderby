import { Dimensions } from "react-native";

// get width and height of device
const { width, height } = Dimensions.get("screen");
const { width: wWidth, height: wHeight } = Dimensions.get("window");

// set screen width and screen height based on detected orientation (portrait/landscape)
const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  windowWidth: wWidth < wHeight ? wWidth : wHeight,
  windowHeight: wWidth < wHeight ? wHeight : wWidth,
};

export default metrics;
