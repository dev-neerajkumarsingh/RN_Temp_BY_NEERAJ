import type { NetworkResponse } from './middleware/Network_Manager';
import {
  NonAuthenticatedServices,
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from './apis/services/NonAuthenticatedServices';
import {
  AuthenticatedServices,
  useLogoutMutation,
  useUpdateToken,
} from './apis/services/AuthenticatedServices';
import { queryKeys } from './networkCache/queryKeys';
import { QueryProvider } from './networkCache/QueryProvider';

export {
  QueryProvider,
  NetworkResponse,
  queryKeys,
  NonAuthenticatedServices,
  AuthenticatedServices,
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useUpdateToken,
};