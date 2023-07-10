import { Provider as ReduxProvider } from "react-redux";
import AppWrapper from "./src/features/app-wrapper/AppWrapper";
import TestScreen from "./src/features/dev/screens/TestScreen";
import { store } from "./store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppWrapper>
        <TestScreen />
      </AppWrapper>
    </ReduxProvider>
  );
}
