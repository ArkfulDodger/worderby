import { useEffect } from "react";
import { AppState } from "react-native";
import { useAppDispatch } from "./reduxHooks";
import { setAppState } from "../reducers/systemReducer";

const useAppState = () => {
  const dispatch = useAppDispatch();

  // subscribe to app state changes, and update in the store on change
  useEffect(() => {
    const stateChange = AppState.addEventListener("change", (state) =>
      dispatch(setAppState(state))
    );
    return () => {
      stateChange.remove();
    };
  }, []);

  return;
};

export default useAppState;
