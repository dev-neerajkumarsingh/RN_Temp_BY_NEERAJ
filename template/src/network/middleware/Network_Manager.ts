/**
 * Network Manager — thin wrapper around the shared `apiClient`.
 *
 * Responsibilities:
 *   - Execute the HTTP request using the endpoint descriptor.
 *   - Normalize the response into the shared `NetworkResponse<T>` shape.
 *
 * What it does NOT do (and must not start doing):
 *   - Touch the Redux store or the Zustand UI store.
 *   - Dispatch toasts, error screens, or logout actions — those belong to
 *     the axios interceptors (cross-cutting) and to TanStack Query's
 *     `onError` handler (query-specific).
 *   - Branch on endpoint strings — multipart/form-data is built at the
 *     service call site using FormData, which flows through untouched.
 */

import type { AxiosRequestConfig, AxiosError } from 'axios';
import { HTTP_METHODS } from './HTTP_Methods';
import { apiClient } from '../client';

export interface NetworkResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string;
  code: number;
  message: string;
}

interface Endpoint {
  endpoint: string;
  method: string;
}

interface Props {
  api: Endpoint;
  apiParams?: Record<string, unknown>;
  apiBody?: Record<string, unknown>;
  apiFormData?: FormData;
  config?: AxiosRequestConfig;
}

export const NetworkManager = async <T = unknown>({
  api,
  apiParams = {},
  apiBody = {},
  apiFormData,
  config = {},
}: Props): Promise<NetworkResponse<T>> => {
  try {
    const isGet = api.method === HTTP_METHODS.GET;
    const hasParams = Object.keys(apiParams).length > 0;
    const body = apiFormData ?? (Object.keys(apiBody).length > 0 ? apiBody : undefined);

    const response = await apiClient.request({
      ...config,
      url: api.endpoint,
      method: api.method,
      params: isGet && hasParams ? apiParams : undefined,
      data: !isGet ? body : undefined,
    });

    // The response interceptor decrypts the payload into
    // `{ status, response: { status, message, data, error } }`.
    const payload = response.data as {
      status?: boolean;
      response?: {
        status?: number;
        message?: string;
        data?: T;
        error?: string;
      };
      data?: T;
    };

    return {
      success: payload?.status ?? true,
      data: (payload?.response?.data ?? payload?.data ?? null) as T | null,
      error: payload?.response?.error ?? '',
      code: payload?.response?.status ?? response.status,
      message: payload?.response?.message ?? '',
    };
  } catch (err) {
    const axiosErr = err as AxiosError;
    const errBody = axiosErr.response?.data as
      | { response?: { status?: number; message?: string }; message?: string }
      | undefined;

    return {
      success: false,
      data: null,
      error: axiosErr.message ?? String(err),
      code: errBody?.response?.status ?? axiosErr.response?.status ?? 500,
      message:
        errBody?.response?.message ?? errBody?.message ?? axiosErr.message ?? 'Network Error',
    };
  }
};
