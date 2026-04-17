import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { initSecureStorage } from '@utils';

/**
 * Persist the TanStack Query cache into the same encrypted MMKV instance that
 * redux-persist uses. The adapter lazily awaits `initSecureStorage()` so it
 * works whether or not the bootstrap init has finished by the time the
 * persister attaches.
 */
const asyncStorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    const storage = await initSecureStorage();
    return storage.getString(key) ?? null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    const storage = await initSecureStorage();
    storage.set(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    const storage = await initSecureStorage();
    storage.remove(key);
  },
};

export const queryPersister = createAsyncStoragePersister({
  storage: asyncStorageAdapter,
  key: 'tanstack-query-cache',
  throttleTime: 1_000,
});
