import { ReactNode } from "react";
import { store } from "../../../../store";
import { Provider as ReduxProvider } from "react-redux";

export type Props = {
  children: ReactNode;
};

// responsible for wrapping the app in global providers
const AppWrapper = ({ children }: Props) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default AppWrapper;
