/**
 * Auth Services - Non-Authenticated API calls
 *
 * Includes:
 * - Base service functions for direct API calls
 * - TanStack Query mutation hooks for React components
 * - Automatic cache management and invalidation
 */

import { API } from '../endpoints/Endpoints';
import {
  NetworkManager,
  NetworkResponse,
} from '../../middleware/Network_Manager';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { MutationConfig } from '../../networkCache/config';

const node = API.NonAuthenticated;

// ============================================
// BASE SERVICE FUNCTIONS
// ============================================

export const NonAuthenticatedServices = {
  privacyPolicy: async (): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.PRIVACY_POLICY,
      apiParams: {},
      apiBody: {},
    });
  },

  termsCondition: async (): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.TERMS_CONDITION,
      apiParams: {},
      apiBody: {},
    });
  },

  login: async (payload: any): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.LOGIN,
      apiParams: {},
      apiBody: payload,
    });
  },

  signup: async (
    payload: any,
    payloadFormData?: any,
  ): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.SIGNUP,
      apiParams: {},
      apiBody: payload,
      apiFormData: payloadFormData,
    });
  },

  sendOtp: async (payload: any): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.SENDOTP,
      apiParams: {},
      apiBody: payload,
    });
  },

  forgotPassword: async (payload: any): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.FORGET_PASSWORD,
      apiParams: {},
      apiBody: payload,
    });
  },
};

// ============================================
// TANSTACK QUERY MUTATION HOOKS FOR POST & PUT METHODS
// ============================================

export const useLoginMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, any>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => NonAuthenticatedServices.login(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export const useSendOtpMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, any>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => NonAuthenticatedServices.sendOtp(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export const useVerifyOtpMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, any>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => NonAuthenticatedServices.sendOtp(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export const useRegisterMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, any>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => NonAuthenticatedServices.signup(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};
