import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
} from 'react-native-keychain';

type Callback = (err?: Error, keys?: string | string[]) => void;

export const KeychainStorage = {
  async getAllKeys(cb: Callback) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (cb) {
        cb(undefined, [...keys]);
      }
      return keys;
    } catch (err) {
      if (cb) {
        cb(err instanceof Error ? err : new Error(String(err)));
      }
      throw err;
    }
  },
  async getItem(key: string, cb: Callback) {
    try {
      const sharedWebCredentials = await getGenericPassword({service: key});
      // Check getGenericPassword documentation https://git.io/JffKK
      if (typeof sharedWebCredentials === 'boolean') {
        throw new Error('entry does not exist');
      }

      const {password} = sharedWebCredentials;
      if (cb) {
        cb(undefined, password);
      }
      return password;
    } catch (err) {
      if (cb) {
        cb(err instanceof Error ? err : new Error(String(err)));
      }
      throw err;
    }
  },
  async setItem(key: string, value: string, cb: Callback) {
    try {
      await Promise.all([
        AsyncStorage.setItem(key, key),
        setGenericPassword('user', value, {service: key}),
      ]);
      await setGenericPassword('user', value, {service: key});
      if (cb) {
        cb(undefined);
      }
    } catch (err) {
      if (cb) {
        cb(err instanceof Error ? err : new Error(String(err)));
      }
      throw err;
    }
  },
  async removeItem(key: string, cb: Callback) {
    try {
      await Promise.all([
        AsyncStorage.removeItem(key),
        resetGenericPassword({service: key}),
      ]);
      if (cb) {
        cb(undefined);
      }
    } catch (err) {
      if (cb) {
        cb(err instanceof Error ? err : new Error(String(err)));
      }
      throw err;
    }
  },
};