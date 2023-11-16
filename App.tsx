import { Provider as ReduxProvider } from "react-redux";
import AppWrapper from "./src/features/app-wrapper/AppWrapper";
import { store } from "./store";
import GamePage from "./src/features/game/screens/GamePage";

// app is fully wrapped in redux provider for use throughout
export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppWrapper>
        <GamePage />
      </AppWrapper>
    </ReduxProvider>
  );
}
