import { Provider as ReduxProvider } from "react-redux";
import AppWrapper from "./src/features/app-wrapper/AppWrapper";
import { store } from "./store";
import GamePage from "./src/features/game/screens/GamePage";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppWrapper>
        {/* <TestScreen /> */}
        <GamePage />
      </AppWrapper>
    </ReduxProvider>
  );
}
