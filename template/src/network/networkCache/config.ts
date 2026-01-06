import { QueryClient, UseMutationOptions } from '@tanstack/react-query';
import { NetworkResponse } from '..';

const defaultMutationConfig = {
  retry: 1,
  retryDelay: 1000,
};

export const MutationConfig = (
  queryClient: QueryClient,
  options?: any,
  queryKey?: string[],
): Omit<UseMutationOptions<NetworkResponse, Error, any>, 'mutationFn'> => {
  return {
    // Spread remaining options (retry, retryDelay, etc.)
    ...defaultMutationConfig,
    onSuccess: (data, variables, context) => {
      // Invalidate all auth queries after successful login
      if (queryKey && queryKey?.length > 0) {
        queryClient.invalidateQueries({ queryKey: queryKey });
      }

      // Call user's onSuccess callback if provided
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Call user's onError callback if provided
      options?.onError?.(error, variables, context);
    },
    onMutate: variables => {
      // Call user's onMutate callback if provided
      return options?.onMutate?.(variables);
    },
    onSettled: (data, error, variables, context) => {
      // Call user's onSettled callback if provided
      options?.onSettled?.(data, error, variables, context);
    },
  };
};
