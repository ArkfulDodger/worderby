import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./src/reducers/themeReducer";
import gameReducer from "./src/reducers/gameReducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    game: gameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
