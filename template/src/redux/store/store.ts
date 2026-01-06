import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import {KeychainStorage} from '../encryption/KeychainStorage';
import authReducer from '../reducers/authReducer';
import loaderReducer from '../reducers/loaderReducer';
import toastReducer from '../reducers/toastReducer';
import errorScreenReducer from '../reducers/errorReducer';
import popupReducer from '../reducers/popupReducer';
import langReducer from '../reducers/langReducer';
import themeReducer from '../reducers/themeReducer';

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage: KeychainStorage,
};

// Combining all redux states and storing it in on local store
// If you don't want to store any redux state on local store then remove persistReducer()
const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  toast: toastReducer,
  errorScreen: errorScreenReducer,
  popup: popupReducer,
  lang: langReducer,
  theme: themeReducer,
  // Add other reducers here as needed
  // e.g., user: persistReducer(persistConfig, userReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;