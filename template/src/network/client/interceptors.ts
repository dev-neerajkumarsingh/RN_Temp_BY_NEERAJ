import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { onlineManager } from '@tanstack/react-query';
import { store, logoutReducer } from '@redux';
import {
  showToast,
  showErrorScreen,
  hideErrorScreen,
} from '@stores';
import { UtilsFunc } from '@utils';

const isFormData = (value: unknown): value is FormData =>
  typeof FormData !== 'undefined' && value instanceof FormData;

const encryptJsonBody = (data: unknown): { reqData: string } =>
  ({ reqData: UtilsFunc.encryptData(JSON.stringify(data)) });

export const attachRequestInterceptor = (client: AxiosInstance): void => {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { isAuthenticated, accessToken } = store.getState().auth;
    if (isAuthenticated && accessToken) {
      config.headers.set('Authorization', accessToken);
    }

    // Encrypt query params (skip if already shaped as { reqData }).
    if (
      config.params &&
      typeof config.params === 'object' &&
      !('reqData' in config.params) &&
      Object.keys(config.params).length > 0
    ) {
      config.params = {
        reqData: UtilsFunc.encryptData(JSON.stringify(config.params)),
      };
    }

    // Encrypt JSON body. FormData is already encrypted at the call site
    // (see service functions for multipart requests) and flows through untouched.
    if (config.data && !isFormData(config.data)) {
      const body = config.data as Record<string, unknown>;
      if (!('reqData' in body)) {
        config.data = encryptJsonBody(body);
      }
    }

    return config;
  });
};

export const attachResponseInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(
    (response) => {
      // Normalize: server responses are shaped as { data: '<encrypted>' }.
      const raw = (response.data as { data?: string })?.data;
      if (typeof raw === 'string') {
        try {
          response.data = JSON.parse(UtilsFunc.decryptData(raw));
        } catch {
          // Leave raw data in place if decryption fails.
        }
      }

      // Any successful response clears a previously-shown offline screen.
      hideErrorScreen();
      return response;
    },
    async (error: AxiosError) => {
      const status = error.response?.status ?? 500;

      // Offline → show retryable error screen.
      if (!onlineManager.isOnline()) {
        showErrorScreen({
          title: 'Oops!',
          message:
            'It seems your internet connection is off. Please check your connection and try again!',
          buttonLabel: 'Try again',
          networkConfig: error.config ?? null,
        });
        return Promise.reject(error);
      }

      // 401 → force logout + notify.
      if (status === 401 && store.getState().auth.isAuthenticated) {
        store.dispatch(logoutReducer());
        showToast({
          type: 'error',
          title: 'Session Expired',
          message: "You've been logged out. Please login again.",
          duration: 3000,
        });
      }

      return Promise.reject(error);
    },
  );
};
