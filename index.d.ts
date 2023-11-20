import Toast from "react-native-toast-notifications";

// allows gameToast to be called in the global scope
// necessary so the toast in the game frame can be invoked from anywhere
declare global {
  var gameToast: Toast | null;
}
