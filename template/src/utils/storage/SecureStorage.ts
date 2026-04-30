import { createMMKV, type MMKV } from 'react-native-mmkv';
import {
  setGenericPassword,
  getGenericPassword,
  ACCESSIBLE,
} from 'react-native-keychain';
import QuickCrypto from 'react-native-quick-crypto';
import { Buffer } from 'buffer';

const MASTER_KEY_SERVICE = 'app.mmkv.masterKey';
const MASTER_KEY_USERNAME = 'mmkv';
const MMKV_ID = 'secure.store';

let storageInstance: MMKV | null = null;
let initPromise: Promise<MMKV> | null = null;

const generateMasterKey = (): string =>
  Buffer.from(QuickCrypto.randomBytes(32)).toString('base64');

const getOrCreateMasterKey = async (): Promise<string> => {
  const existing = await getGenericPassword({ service: MASTER_KEY_SERVICE });
  if (existing && typeof existing !== 'boolean') {
    return existing.password;
  }

  const key = generateMasterKey();
  await setGenericPassword(MASTER_KEY_USERNAME, key, {
    service: MASTER_KEY_SERVICE,
    accessible: ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
  });
  return key;
};

export const initSecureStorage = (): Promise<MMKV> => {
  if (storageInstance) return Promise.resolve(storageInstance);
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const encryptionKey = await getOrCreateMasterKey();
    // react-native-mmkv v4 replaced `new MMKV(...)` with `createMMKV(...)`.
    // `MMKV` is now a TYPE-only export and is undefined at runtime.
    storageInstance = createMMKV({ id: MMKV_ID, encryptionKey });
    return storageInstance;
  })();

  return initPromise;
};

export const getSecureStorage = (): MMKV => {
  if (!storageInstance) {
    throw new Error(
      'SecureStorage accessed before init. Call initSecureStorage() during app bootstrap.',
    );
  }
  return storageInstance;
};
