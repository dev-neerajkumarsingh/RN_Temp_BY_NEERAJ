/**
 * Non-authenticated API services.
 *
 * Each service is a thin function over `NetworkManager`. Multipart requests
 * build their own FormData locally — that logic used to live inside
 * Network_Manager via endpoint string-matching, which was unmaintainable.
 */

import { API } from '../endpoints/Endpoints';
import {
  NetworkManager,
  NetworkResponse,
} from '../../middleware/Network_Manager';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { UtilsFunc } from '@utils';
import { MutationConfig } from '../../networkCache/config';
import { queryKeys } from '../../networkCache/queryKeys';

const node = API.NonAuthenticated;

export interface SignupFiles {
  profileImages?: unknown[];
  profile?: unknown;
  securityFiles?: unknown;
}

const buildSignupFormData = (payload: unknown, files: SignupFiles): FormData => {
  const fd = new FormData();
  files.profileImages?.forEach((item) => {
    fd.append('profileImages', item as never);
  });
  if (files.profile) fd.append('profilePic', files.profile as never);
  if (files.securityFiles) fd.append('securityFiles', files.securityFiles as never);
  fd.append('reqData', UtilsFunc.encryptData(JSON.stringify(payload)));
  return fd;
};

export const NonAuthenticatedServices = {
  privacyPolicy: (): Promise<NetworkResponse> =>
    NetworkManager({ api: node.PRIVACY_POLICY }),

  termsCondition: (): Promise<NetworkResponse> =>
    NetworkManager({ api: node.TERMS_CONDITION }),

  login: (payload: Record<string, unknown>): Promise<NetworkResponse> =>
    NetworkManager({ api: node.LOGIN, apiBody: payload }),

  signup: (
    payload: Record<string, unknown>,
    files?: SignupFiles,
  ): Promise<NetworkResponse> =>
    files
      ? NetworkManager({
          api: node.SIGNUP,
          apiFormData: buildSignupFormData(payload, files),
        })
      : NetworkManager({ api: node.SIGNUP, apiBody: payload }),

  sendOtp: (payload: Record<string, unknown>): Promise<NetworkResponse> =>
    NetworkManager({ api: node.SENDOTP, apiBody: payload }),

  forgotPassword: (payload: Record<string, unknown>): Promise<NetworkResponse> =>
    NetworkManager({ api: node.FORGET_PASSWORD, apiBody: payload }),
};

// ============================================
// TANSTACK QUERY MUTATION HOOKS
// ============================================

export const useLoginMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, Record<string, unknown>>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => NonAuthenticatedServices.login(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export const useSendOtpMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, Record<string, unknown>>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => NonAuthenticatedServices.sendOtp(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export const useVerifyOtpMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, Record<string, unknown>>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => NonAuthenticatedServices.sendOtp(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export interface RegisterPayload {
  data: Record<string, unknown>;
  files?: SignupFiles;
}

export const useRegisterMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, RegisterPayload>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      NonAuthenticatedServices.signup(payload.data, payload.files),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

// ============================================
// TANSTACK QUERY HOOKS FOR GET METHODS
// ============================================

type QueryOpts<T> = Omit<
  UseQueryOptions<NetworkResponse<T>, Error>,
  'queryKey' | 'queryFn'
>;

export const usePrivacyPolicyQuery = <T = unknown>(opts?: QueryOpts<T>) =>
  useQuery<NetworkResponse<T>, Error>({
    queryKey: queryKeys.nonAuthenticated.privacypolicy(),
    queryFn: () => NonAuthenticatedServices.privacyPolicy() as Promise<NetworkResponse<T>>,
    ...opts,
  });

export const useTermsConditionQuery = <T = unknown>(opts?: QueryOpts<T>) =>
  useQuery<NetworkResponse<T>, Error>({
    queryKey: queryKeys.nonAuthenticated.termscondition(),
    queryFn: () => NonAuthenticatedServices.termsCondition() as Promise<NetworkResponse<T>>,
    ...opts,
  });
