import React from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient } from './queryClient';
import { queryPersister } from './queryPersister';

// Note on devtools: `@tanstack/react-query-devtools` renders via the DOM and
// doesn't work in React Native. If you want a query inspector on-device, swap
// in `react-query-native-devtools` or the Reactotron plugin. The devtools
// dep in package.json is intentionally present so web/Storybook consumers
// can import it; it is not rendered here.

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        // Bump `buster` whenever your cached query shapes change across
        // releases — it nukes the persisted cache so stale shapes don't
        // resurrect after an app update.
        buster: 'v1',
        maxAge: 24 * 60 * 60 * 1000,
      }}>
      {children}
    </PersistQueryClientProvider>
  );
};
