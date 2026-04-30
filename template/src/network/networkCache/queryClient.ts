// ============================================
// QUERY CLIENT SETUP WITH NETWORK AWARENESS
// ============================================

import {
  QueryClient,
  QueryCache,
  MutationCache,
  onlineManager,
} from '@tanstack/react-query';
import { showToast } from '@stores';
import NetInfo from '@react-native-community/netinfo';

// Bridge NetInfo → TanStack Query's onlineManager so queries know about
// connectivity changes on RN (no built-in window focus / online events).
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected && !!state.isInternetReachable);
  });
});

// Global error handler — single source of truth for unhandled query errors.
// Per-query `onError` callbacks still run; this only catches errors that
// aren't swallowed by the consumer.
const handleError = (error: unknown) => {
  const code = (error as { code?: number })?.code;
  // 401 is already handled by the axios response interceptor (logout + toast).
  if (code === 401) return;

  const message =
    (error as { message?: string })?.message ?? 'Something went wrong';
  showToast({
    type: 'error',
    title: 'Error',
    message,
    duration: 3000,
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000, // 24h so persisted cache survives a day.
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      // offlineFirst: serve cached data immediately, queue the network fetch,
      // and resume when connectivity returns. The right default for mobile
      // on flaky networks — especially low-end Android.
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
});
