import { ToastOptions } from "react-native-toast-notifications";

// displays the new toast, removing any existing toasts first
export const showToast = (
  message: string | JSX.Element,
  toastOptions?: ToastOptions | undefined
) => {
  gameToast?.hideAll();
  gameToast?.show(message, { placement: "top", ...toastOptions });
};

export const warnToast = (
  message: string | JSX.Element,
  toastOptions?: ToastOptions | undefined
) => {
  showToast(message, { ...toastOptions, type: "warning" });
};

export const errorToast = (
  message: string | JSX.Element,
  toastOptions?: ToastOptions | undefined
) => {
  showToast(message, { ...toastOptions, type: "danger" });
};

export const successToast = (
  message: string | JSX.Element,
  toastOptions?: ToastOptions | undefined
) => {
  showToast(message, { ...toastOptions, type: "success" });
};
