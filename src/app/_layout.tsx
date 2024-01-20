import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/store";
import AppWrapper from "../features/app-wrapper/AppWrapper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <ReduxProvider store={store}>
        <AppWrapper>
          <Slot />
        </AppWrapper>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
