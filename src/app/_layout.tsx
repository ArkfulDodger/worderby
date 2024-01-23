import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/store";
import AppWrapper from "../features/app-wrapper/AppWrapper";

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
