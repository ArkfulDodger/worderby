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
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
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
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
  };
};
