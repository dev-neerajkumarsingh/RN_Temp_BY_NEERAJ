// ============================================
// QUERY CLIENT SETUP WITH NETWORK AWARENESS
// ============================================

import {
  QueryClient,
  QueryCache,
  MutationCache,
  onlineManager,
} from '@tanstack/react-query';
import { store as Stores, showToast } from '@redux';
import NetInfo from '@react-native-community/netinfo';

// Setup online manager with NetInfo
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected && !!state.isInternetReachable);
  });
});

// Global error handler
const handleError = (error: any) => {
  const dispatch = Stores.dispatch;

  // Only show toast for errors not handled by individual queries
  if (error?.code !== 401) {
    dispatch(
      showToast({
        type: 'error',
        title: 'Error',
        message: error?.message || 'Something went wrong',
        duration: 3000,
      }),
    );
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults for all queries
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache data for 10 minutes (formerly cacheTime)
      retry: 2, // Retry failed requests 2 times
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Don't refetch on app focus (can enable if needed)
      refetchOnReconnect: true, // Refetch when internet reconnects
      networkMode: 'online', // Only run queries when online (use 'offlineFirst' for offline support)
    },
    mutations: {
      // Global defaults for all mutations
      retry: 1,
      networkMode: 'online',
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
});
