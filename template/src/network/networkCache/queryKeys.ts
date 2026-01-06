export const queryKeys = {
  // For Non-Authenticated APIs Flow related
  nonAuthenticated: {
    all: ['auth'] as const,
    privacypolicy: (): string[] => [...queryKeys.nonAuthenticated.all, 'privacypolicy'] as const,
    termscondition: (): string[] => [...queryKeys.nonAuthenticated.all, 'termscondition'] as const,
    login: (): string[] => [...queryKeys.nonAuthenticated.all, 'login'] as const,
    signup: (): string[] => [...queryKeys.nonAuthenticated.all, 'signup'] as const,
    sendotp: (): string[] => [...queryKeys.nonAuthenticated.all, 'sendotp'] as const,
    forgotpassword: (): string[] => [...queryKeys.nonAuthenticated.all, 'forgotpassword'] as const,
    // Rest of your keys here...
  },
  // For Authenticated APIs Flow related
  authenticated: {
    all: ['app'] as const,
    profile: (): string[] => [...queryKeys.authenticated.all, 'profile'] as const,
    logout: (): string[] => [...queryKeys.authenticated.all, 'logout'] as const,
    updatetoken: (): string[] => [...queryKeys.authenticated.all, 'updatetoken'] as const,
    // Rest of yours keys here...
  },
} as const;