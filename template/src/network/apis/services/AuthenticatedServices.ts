/**
 * Authenticated API services.
 *
 * The axios request interceptor injects the access token automatically,
 * so service functions don't pass tokens explicitly.
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

const node = API.Authenticated;

const buildProfileUpdateFormData = (
  payload: Record<string, unknown>,
  profilePic?: unknown,
): FormData => {
  const fd = new FormData();
  if (profilePic) fd.append('profilePic', profilePic as never);
  fd.append('reqData', UtilsFunc.encryptData(JSON.stringify(payload)));
  return fd;
};

export const AuthenticatedServices = {
  logout: (): Promise<NetworkResponse> =>
    NetworkManager({ api: node.LOGOUT }),

  fetchUserProfile: (): Promise<NetworkResponse> =>
    NetworkManager({ api: node.FETCH_PROFILE }),

  updateToken: (payload: Record<string, unknown>): Promise<NetworkResponse> =>
    NetworkManager({ api: node.REFRESH_TOKEN, apiParams: payload }),

  updateProfile: (
    payload: Record<string, unknown>,
    profilePic?: unknown,
  ): Promise<NetworkResponse> =>
    profilePic
      ? NetworkManager({
          api: node.FETCH_PROFILE,
          apiFormData: buildProfileUpdateFormData(payload, profilePic),
        })
      : NetworkManager({ api: node.FETCH_PROFILE, apiBody: payload }),
};

// ============================================
// TANSTACK QUERY MUTATION HOOKS
// ============================================

export const useLogoutMutation = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, void>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => AuthenticatedServices.logout(),
    ...MutationConfig(queryClient, options, queryKey),
  });
};

export const useUpdateToken = (
  options?: Omit<UseMutationOptions<NetworkResponse, Error, Record<string, unknown>>, 'mutationFn'>,
  queryKey?: string[],
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => AuthenticatedServices.updateToken(payload),
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

/**
 * Fetches the user profile. Enabled only when the user is authenticated — the
 * consumer should pass `{ enabled: isAuthenticated }` to avoid firing on the
 * login screen.
 */
export const useUserProfileQuery = <T = unknown>(opts?: QueryOpts<T>) =>
  useQuery<NetworkResponse<T>, Error>({
    queryKey: queryKeys.authenticated.profile(),
    queryFn: () => AuthenticatedServices.fetchUserProfile() as Promise<NetworkResponse<T>>,
    ...opts,
  });
