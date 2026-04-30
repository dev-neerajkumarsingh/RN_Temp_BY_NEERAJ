import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { MMKVStorageAdapter } from '@utils';
import authReducer from '../reducers/authReducer';
import langReducer from '../reducers/langReducer';
import themeReducer from '../reducers/themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage: MMKVStorageAdapter,
  whitelist: ['auth', 'theme', 'lang'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
