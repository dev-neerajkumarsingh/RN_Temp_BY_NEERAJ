import type { Storage } from 'redux-persist';
import { initSecureStorage } from './SecureStorage';

export const MMKVStorageAdapter: Storage = {
  setItem: async (key, value) => {
    const storage = await initSecureStorage();
    storage.set(key, value);
    return true;
  },
  getItem: async (key) => {
    const storage = await initSecureStorage();
    return storage.getString(key) ?? null;
  },
  removeItem: async (key) => {
    const storage = await initSecureStorage();
    storage.delete(key);
  },
};
