import { Slot } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/store";
import AppWrapper from "../features/app-wrapper/AppWrapper";

if (__DEV__) {
  import("../../ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const RootLayout = () => {
  return (
      <ReduxProvider store={store}>
        <AppWrapper>
          <Slot />
        </AppWrapper>
      </ReduxProvider>
  );
};

export default RootLayout;
