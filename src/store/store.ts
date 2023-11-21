import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import gameReducer from "./slices/gameSlice";
import systemReducer from "./slices/systemSlice";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    theme: themeReducer,
    game: gameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
