// List all endpoints here
// @ts-check
import { HTTP_METHODS } from '../../middleware/HTTP_Methods';

// ******************
// Endpoint class takes 3 params in constructor ==> "endpoint", "http-method", "API-version"
// By default, version is set to v1
// ******************
export const API = {
  NonAuthenticated: {
    PRIVACY_POLICY: { endpoint: 'privacy-policy', method: HTTP_METHODS.GET },
    TERMS_CONDITION: { endpoint: 'user/v1/account/list', method: HTTP_METHODS.GET },
    LOGIN: { endpoint: 'user/v1/auth/login', method: HTTP_METHODS.POST },
    SIGNUP: { endpoint: 'api/user/v1/auth/register', method: HTTP_METHODS.POST },
    FORGET_PASSWORD: { endpoint: 'auth/forgot-password', method: HTTP_METHODS.POST },
    SENDOTP: { endpoint: 'api/user/v1/auth/sendotp', method: HTTP_METHODS.POST },
  },
  Authenticated: {
    LOGOUT: { endpoint: 'auth/logout', method: HTTP_METHODS.GET },
    REFRESH_TOKEN: {
      endpoint: 'auth/refresh-token',
      method: HTTP_METHODS.GET,
    },
    FETCH_PROFILE: { endpoint: 'profile', method: HTTP_METHODS.GET },
  },
};
