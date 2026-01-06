import { persistor, store } from './store/store';
import type { RootState } from './store/store';
import {
  loginReducer,
  logoutReducer,
  refreshTokenReducer,
} from './reducers/authReducer';
import { showToast, hideToast } from './reducers/toastReducer';
import { showLoader, hideLoader } from './reducers/loaderReducer';
import { showErrorScreen, hideErrorScreen } from './reducers/errorReducer';
import { showPopup, hidePopup } from './reducers/popupReducer';
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
  showToast,
  hideToast,
  showLoader,
  hideLoader,
  showErrorScreen,
  hideErrorScreen,
  showPopup,
  hidePopup,
  selectLang,
  defaultLang,
};
