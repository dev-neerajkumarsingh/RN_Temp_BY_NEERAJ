import { create } from 'zustand';
import type { AxiosRequestConfig } from 'axios';

export type ToastType = 'error' | 'success' | 'warn' | 'info';

export interface ToastState {
  status: boolean;
  type: ToastType;
  title?: string;
  message: string;
  duration: number;
}

export interface LoaderState {
  status: boolean;
}

export interface PopupState {
  status: boolean;
  title: string;
  buttonLabel: string;
  onPressType?: string;
}

export interface ErrorScreenState {
  status: boolean;
  title: string;
  message: string;
  buttonLabel: 'Try again' | 'Ok';
  networkConfig: AxiosRequestConfig | null;
}

export interface ShowToastPayload {
  type: ToastType;
  title?: string;
  message: string;
  duration: number;
}

export interface ShowPopupPayload {
  title: string;
  buttonLabel: string;
  onPressType?: string;
}

export interface ShowErrorScreenPayload {
  title: string;
  message: string;
  buttonLabel: 'Try again' | 'Ok';
  networkConfig: AxiosRequestConfig | null;
}

interface UIStore {
  toast: ToastState;
  loader: LoaderState;
  popup: PopupState;
  errorScreen: ErrorScreenState;

  showToast: (payload: ShowToastPayload) => void;
  hideToast: () => void;
  showLoader: () => void;
  hideLoader: () => void;
  showPopup: (payload: ShowPopupPayload) => void;
  hidePopup: () => void;
  showErrorScreen: (payload: ShowErrorScreenPayload) => void;
  hideErrorScreen: () => void;
}

const initialToast: ToastState = {
  status: false,
  type: 'success',
  title: '',
  message: '',
  duration: 3000,
};

const initialPopup: PopupState = {
  status: false,
  title: '',
  buttonLabel: '',
  onPressType: '',
};

const initialErrorScreen: ErrorScreenState = {
  status: false,
  title: '',
  message: '',
  buttonLabel: 'Try again',
  networkConfig: null,
};

export const useUIStore = create<UIStore>((set) => ({
  toast: initialToast,
  loader: { status: false },
  popup: initialPopup,
  errorScreen: initialErrorScreen,

  showToast: (payload) =>
    set({
      toast: {
        status: true,
        type: payload.type,
        title: payload.title ?? '',
        message: payload.message,
        duration: payload.duration,
      },
    }),
  hideToast: () =>
    set((state) => ({ toast: { ...state.toast, status: false } })),

  showLoader: () => set({ loader: { status: true } }),
  hideLoader: () => set({ loader: { status: false } }),

  showPopup: (payload) =>
    set({
      popup: {
        status: true,
        title: payload.title,
        buttonLabel: payload.buttonLabel,
        onPressType: payload.onPressType ?? '',
      },
    }),
  hidePopup: () => set({ popup: initialPopup }),

  showErrorScreen: (payload) =>
    set({
      errorScreen: {
        status: true,
        title: payload.title,
        message: payload.message,
        buttonLabel: payload.buttonLabel,
        networkConfig: payload.networkConfig,
      },
    }),
  hideErrorScreen: () => set({ errorScreen: initialErrorScreen }),
}));

// Non-hook helpers for use outside React components (interceptors, network layer, etc.)
export const showToast = (payload: ShowToastPayload) =>
  useUIStore.getState().showToast(payload);
export const hideToast = () => useUIStore.getState().hideToast();
export const showLoader = () => useUIStore.getState().showLoader();
export const hideLoader = () => useUIStore.getState().hideLoader();
export const showPopup = (payload: ShowPopupPayload) =>
  useUIStore.getState().showPopup(payload);
export const hidePopup = () => useUIStore.getState().hidePopup();
export const showErrorScreen = (payload: ShowErrorScreenPayload) =>
  useUIStore.getState().showErrorScreen(payload);
export const hideErrorScreen = () => useUIStore.getState().hideErrorScreen();
