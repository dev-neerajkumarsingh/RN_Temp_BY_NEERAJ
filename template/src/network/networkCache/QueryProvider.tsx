import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

// Optional: For debugging in development
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Uncomment for dev tools in development */}
      {/* {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  );
};
