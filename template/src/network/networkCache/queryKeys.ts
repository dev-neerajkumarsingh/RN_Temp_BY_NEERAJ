/**
 * Centralized query-key factory.
 *
 * Use `as const` tuples so invalidation works with structural prefixes:
 *
 *   queryClient.invalidateQueries({ queryKey: queryKeys.authenticated.all });
 *     → invalidates every authenticated query
 *
 *   queryClient.invalidateQueries({ queryKey: queryKeys.authenticated.profile() });
 *     → invalidates only the profile query
 */

export const queryKeys = {
  nonAuthenticated: {
    all: ['auth'] as const,
    privacypolicy: () => [...queryKeys.nonAuthenticated.all, 'privacypolicy'] as const,
    termscondition: () => [...queryKeys.nonAuthenticated.all, 'termscondition'] as const,
    login: () => [...queryKeys.nonAuthenticated.all, 'login'] as const,
    signup: () => [...queryKeys.nonAuthenticated.all, 'signup'] as const,
    sendotp: () => [...queryKeys.nonAuthenticated.all, 'sendotp'] as const,
    forgotpassword: () => [...queryKeys.nonAuthenticated.all, 'forgotpassword'] as const,
  },
  authenticated: {
    all: ['app'] as const,
    profile: () => [...queryKeys.authenticated.all, 'profile'] as const,
    logout: () => [...queryKeys.authenticated.all, 'logout'] as const,
    updatetoken: () => [...queryKeys.authenticated.all, 'updatetoken'] as const,
  },
} as const;
