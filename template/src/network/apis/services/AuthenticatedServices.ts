// All Authenticated type calls will go here

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

const node = API.Authenticated;

export const AuthenticatedServices = {
  logout: async (): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.LOGOUT,
      apiParams: {},
      apiBody: {},
    });
  },

  fetchUserProfile: async (): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.FETCH_PROFILE,
      apiParams: {},
      apiBody: {},
    });
  },

  updateToken: async (payload: any): Promise<NetworkResponse> => {
    return await NetworkManager({
      api: node.REFRESH_TOKEN,
      apiParams: payload,
      apiBody: {},
    });
  },
};

// ============================================
// TANSTACK QUERY MUTATION HOOKS
// ============================================

export const useLogoutMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, any>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthenticatedServices.logout(),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export const useUpdateToken = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, any>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => AuthenticatedServices.updateToken(payload),
    ...MutationConfig(queryClient, options, queryKey),
  });
};
