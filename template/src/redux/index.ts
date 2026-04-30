import { persistor, store } from './store/store';
import type { RootState } from './store/store';
import {
  loginReducer,
  logoutReducer,
  refreshTokenReducer,
} from './reducers/authReducer';
import { selectLang, defaultLang } from './reducers/langReducer';
import { useAppDispatch, useAppSelector } from './reduxHooks/reduxHooks';

export {
  store,
  persistor,
  RootState,
  useAppDispatch,
  useAppSelector,
  loginReducer,
  logoutReducer,
  refreshTokenReducer,
  selectLang,
  defaultLang,
};
