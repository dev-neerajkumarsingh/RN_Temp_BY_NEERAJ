/* eslint-disable dot-notation */
/**
 * Network Manager - Enhanced with isOnline and TanStack Query Support
 *
 * Higher Order Middleware to make all network calls with:
 * - isOnline integration for connection detection
 * - Automatic token handling
 * - Error handling with Redux integration
 * - Support for React Query (skipToast, skipErrorScreen options)
 * - Multi-language support
 * - File upload support
 */

import { onlineManager } from '@tanstack/react-query';
import { HTTP_METHODS } from '../middleware/HTTP_Methods';
import {
  store as Stores,
  showToast,
  logoutReducer,
  showErrorScreen,
  hideErrorScreen,
} from '@redux';
import { Constant } from '@constants';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useTryCatch } from '@hooks';
import { UtilsFunc } from '@utils';

type Props = {
  api?: any;
  apiParams?: any;
  apiBody?: any;
  apiFormData?: any;
  skipToast?: boolean;
  skipErrorScreen?: boolean;
};

export interface NetworkResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string;
  code: number;
  message: string;
}

/**
 * Enhanced NetworkManager with isOnline and React Query support
 *
 * @param api - API endpoint configuration from Endpoints.ts
 * @param apiParams - URL parameters (object or array)
 * @param apiBody - Request body for POST/PUT requests
 * @param skipToast - Skip showing toast (useful when React Query handles errors)
 * @param skipErrorScreen - Skip showing error screen (useful for background refetch)
 * @returns Promise<NetworkResponse<T>>
 *
 * @example
 * // Basic usage
 * const response = await NetworkManager({
 *   api: API.AUTH.LOGIN,
 *   apiParams: {},
 *   apiBody: { email, password }
 * });
 *
 * @example
 * // With React Query (skip toast/error screen)
 * const response = await NetworkManager({
 *   api: API.USER.FETCH_LIST,
 *   apiParams: { page: 1, limit: 20 },
 *   apiBody: {},
 *   skipToast: true,
 *   skipErrorScreen: true
 * });
 */
export const NetworkManager = async <T = any>({
  api,
  apiParams = {},
  apiBody = {},
  apiFormData,
  skipToast = false,
  skipErrorScreen = false,
}: Props): Promise<NetworkResponse<T>> => {
  const { isAuthenticated, accessToken } = Stores.getState()?.auth;
  const { networkConfig } = Stores.getState()?.errorScreen;
  const dispatch = Stores.dispatch;

  let error = '';
  let message = '';
  let data: any = null;
  let response: any = null;
  let success = false;
  let code = 500;
  let tempRecentConfig: AxiosRequestConfig | null = null;

  // Check internet connection using isOnline
  const isOnline = onlineManager.isOnline();

  // Use existing network config from error screen retry, or build new config
  if (networkConfig) {
    tempRecentConfig = networkConfig;
  }

  if (!networkConfig) {
    const baseUrl = Constant.BASE_URL;
    const endpoint = api.endpoint;
    const method = api.method;
    let params = apiParams;
    let body = apiBody;
    let headers: Record<string, string> = {
      'Content-Type': apiFormData ? 'multipart/form-data' : 'application/json',
    };

    /**
     * Build URL parameters from params object or array
     * Supports:
     * - Array: [id1, id2] -> /id1/id2
     * - Object: {page: 1, limit: 10} -> ?page=1&limit=10
     */
    let requestedParams =
    Object.keys(params).length > 0
      ? `?reqData=${UtilsFunc.encryptData(JSON.stringify(params))}`
      : '';

    const url = `${baseUrl}${endpoint}${requestedParams}`;

    // Add Authorization header if user is authenticated
    if (isAuthenticated) {
      headers['Authorization'] = `${accessToken}`;
    }

    // Build config WITHOUT data property initially
    let config: AxiosRequestConfig = {
      method,
      url,
      headers,
      timeout: 10000,
    };

    if (isAuthenticated) {
      body['token'] = accessToken;
    }

    // ==================== HANDLE NON-GET REQUESTS ====================
    if (method !== HTTP_METHODS.GET) {
      // Add token to body if authenticated

      // Encrypting payload
      const encryptedBody = UtilsFunc.encryptData(JSON.stringify(body));

      // Handle multipart/form-data for file uploads
      if (endpoint.includes('api/user/v1/auth/register')) {
        // Multiple file attachments
        const formData1 = new FormData();
        if (apiFormData && Object.keys(apiFormData).length > 0) {
          apiFormData.profileImages.map((item: any) => {
            formData1.append('profileImages', item);
          });
          formData1.append('profilePic', apiFormData.profile);
          formData1.append('securityFiles', apiFormData.securityFiles);
        }
        formData1.append('reqData', encryptedBody);
        config.data = formData1;
      } else if (endpoint.includes('api/user/v1/account/update-profile')) {
        // Single file attachment
        const formData1 = new FormData();
        if (apiFormData && Object.keys(apiFormData).length > 0) {
          formData1.append('profilePic', apiFormData);
          formData1.append('reqData', encryptedBody);
          config.data = formData1;
        } else {
          config.data = { reqData: encryptedBody };
        }
      } else {
        // Standard POST/PUT/DELETE requests
        config.data = { reqData: encryptedBody };
      }
    }
    // ==================== HANDLE GET REQUESTS ====================
    // For GET requests, don't add data property at all
    // Query params are already in the URL via requestedParams

    tempRecentConfig = config;
  }

  console.info('#>> Network_Manager :: tempRecentConfig :: ', tempRecentConfig);

  // Execute the API request with error handling
  const { data: responseData, error: responseError } = await useTryCatch(
    axios(tempRecentConfig!),
  );

  // ==================== ERROR HANDLING ====================
  if (responseError) {
    console.error('#>> Network_Manager :: responseError :: ', responseError);
    success = false;

    // Handle no internet connection FIRST
    if (!isOnline && !skipErrorScreen) {
      dispatch(
        showErrorScreen({
          title: 'Oops!',
          message:
            'It seems your internet connection is off. Please check your connection and try again!',
          buttonLabel: 'Try again',
          networkConfig: tempRecentConfig,
        }),
      );
      return {
        success,
        data,
        error: 'No internet connection',
        code,
        message: 'No internet connection',
      };
    }

    // Try to extract response data if available
    const axiosError = responseError as AxiosError;
    const errorResponse = axiosError.response;

    if (errorResponse?.data) {
      try {
        // Attempt to decrypt response if encrypted
        const decryptResponse = JSON.parse(
          UtilsFunc.decryptData(`${(errorResponse.data as any)?.data}`),
        );

        code = decryptResponse?.response?.status || errorResponse.status || 500;
        message = decryptResponse?.response?.message || 'Network Error';
        response = decryptResponse;
      } catch (decryptError) {
        // If decryption fails, use raw response
        code = errorResponse.status || 500;
        message = (errorResponse.data as any)?.message || errorResponse.statusText || 'Network Error';
        response = errorResponse.data;
      }
    } else {
      // No response from server (network error, timeout, etc.)
      code = 500;
      message = axiosError.message || 'Network Error';
      response = null;
    }

    // Handle 401 Unauthorized (token expired)
    if (code === 401 && isAuthenticated) {
      dispatch(logoutReducer());
      if (!skipToast) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Session Expired',
            message: "You've been logged out. Please login again.",
            duration: 3000,
          }),
        );
      }
    }

    // Handle other errors (4xx, 5xx) - skip 401 since already handled
    if (code !== 401 && !skipToast) {
      dispatch(
        showToast({
          type: 'error',
          title: 'Error',
          message: response?.msg || message || 'Something went wrong',
          duration: 3000,
        }),
      );
    }

    return {
      success,
      data: response,
      error: `${responseError}`,
      code,
      message,
    };
  }

  // ==================== SUCCESS HANDLING ====================
  if (responseData) {
    console.log('#>> Network_Manager :: responseData :: ', responseData);

    try {
      const decryptResponse = JSON.parse(
        UtilsFunc.decryptData(`${responseData?.data?.data}`),
      );

      console.log('#>>> decryptResponse :: ', decryptResponse);
      code = decryptResponse?.response?.status || responseData.status;
      message = decryptResponse?.response?.message || '';
      response = decryptResponse?.response?.data;
      error = decryptResponse?.response?.error || '';

      // Handle successful responses (200, 201)
      if (responseData?.status === 200 || responseData?.status === 201) {
        data = response;
        success = decryptResponse?.status ?? true;
        message = message;

        // Hide error screen on successful response
        dispatch(hideErrorScreen());
      }

      // Double-check for 401 in success response (edge case)
      if (code === 401 && isAuthenticated) {
        dispatch(logoutReducer());
        if (!skipToast) {
          dispatch(
            showToast({
              type: 'error',
              title: 'Session Expired',
              message: "You've been logged out. Please login again.",
              duration: 3000,
            }),
          );
        }
      }

      return { success, data, error, code, message };
    } catch (decryptError) {
      // Handle decryption failure
      console.error('#>> Decryption Error :: ', decryptError);
      return {
        success: false,
        data: null,
        error: 'Failed to decrypt response',
        code: 500,
        message: 'Response decryption failed',
      };
    }
  }

  // Fallback return (should never reach here)
  return {
    success: false,
    data: null,
    error: 'Unknown error occurred',
    code: 500,
    message: 'Unknown error',
  };
};
