import type { NetworkResponse } from './middleware/Network_Manager';
import { NetworkManager } from './middleware/Network_Manager';
import { apiClient } from './client';
import {
  NonAuthenticatedServices,
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  usePrivacyPolicyQuery,
  useTermsConditionQuery,
} from './apis/services/NonAuthenticatedServices';
import type { RegisterPayload, SignupFiles } from './apis/services/NonAuthenticatedServices';
import {
  AuthenticatedServices,
  useLogoutMutation,
  useUpdateToken,
  useUserProfileQuery,
} from './apis/services/AuthenticatedServices';
import { queryKeys } from './networkCache/queryKeys';
import { QueryProvider } from './networkCache/QueryProvider';
import { queryClient } from './networkCache/queryClient';

export {
  apiClient,
  queryClient,
  QueryProvider,
  NetworkManager,
  NetworkResponse,
  queryKeys,
  NonAuthenticatedServices,
  AuthenticatedServices,
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  usePrivacyPolicyQuery,
  useTermsConditionQuery,
  useLogoutMutation,
  useUpdateToken,
  useUserProfileQuery,
  RegisterPayload,
  SignupFiles,
};
