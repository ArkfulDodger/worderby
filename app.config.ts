module.exports = () => {
  // environment vars ("develpment" is default)
  const IS_PREV = process.env.BUILD_PROFILE === "preview";
  const IS_PROD = process.env.BUILD_PROFILE === "production";

  // platform vars
  // const IS_ANDROID = process.env.PLATFORM === "android";
  // const IS_IOS = process.env.PLATFORM === "ios";

  return {
    name: IS_PROD ? "Worderby" : IS_PREV ? "Worderby - Preview" : "WORDER-DEV",
    slug: "worderby",
    scheme: "worderby",
    owner: "arkfuldodger",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FFF0E6",
    },
    assetBundlePatterns: ["**/*"],
    updates: {
      url: "https://u.expo.dev/26e4d88c-e377-4718-817a-6eca82dba993",
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_PROD
        ? "com.arkfuldodger.worderby"
        : IS_PREV
        ? "com.arkfuldodger.worderby.preview"
        : "com.arkfuldodger.worderby.dev",
      splash: {
        image: "./src/assets/images/worderby-splash.png",
        resizeMode: "contain",
        backgroundColor: "#FFF0E6",
        dark: {
          image: "./src/assets/images/worderby-splash-dark.png",
          resizeMode: "cover",
          backgroundColor: "#05031e",
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon-foreground.png",
        backgroundImage: "./src/assets/images/adaptive-icon-background.png",
        monochromeImage: "./src/assets/images/adaptive-icon-monochrome.png",
        backgroundColor: "#FFF0E6",
      },
      splash: {
        image: "./src/assets/images/worderby-splash.png",
        resizeMode: "contain",
        backgroundColor: "#FFF0E6",
        dark: {
          image: "./src/assets/images/worderby-splash-dark.png",
          resizeMode: "cover",
          backgroundColor: "#05031e",
        },
      },
      package: IS_PROD
        ? "com.arkfuldodger.worderby"
        : IS_PREV
        ? "com.arkfuldodger.worderby.preview"
        : "com.arkfuldodger.worderby.dev",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "26e4d88c-e377-4718-817a-6eca82dba993",
      },
    },
    plugins: [
      "expo-router",
      [
        "expo-font",
        {
          fonts: [
            "src/assets/fonts/AppareoExtraLight.ttf",
            "src/assets/fonts/AppareoLight.ttf",
            "src/assets/fonts/AppareoMedium.ttf",
            "src/assets/fonts/AppareoBlack.ttf",
            "src/assets/fonts/Teko-Regular.ttf",
            "src/assets/fonts/Teko-Bold.ttf",
            "src/assets/fonts/Ubuntu-Light.ttf",
            "src/assets/fonts/Ubuntu-LightItalic.ttf",
            "src/assets/fonts/Ubuntu-Regular.ttf",
            "src/assets/fonts/Ubuntu-Italic.ttf",
            "src/assets/fonts/Ubuntu-Medium.ttf",
            "src/assets/fonts/Ubuntu-MediumItalic.ttf",
            "src/assets/fonts/Ubuntu-Bold.ttf",
            "src/assets/fonts/Ubuntu-BoldItalic.ttf",
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
