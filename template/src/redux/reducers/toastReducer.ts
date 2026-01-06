import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToastState {
  status: boolean;
  type: 'error' | 'success' | 'warn' | 'info';
  title?: string;
  message: string;
  duration: number;
}

const initialState: ToastState | undefined = {
  status: false,
  type: 'success',
  title: '',
  message: '',
  duration: 3000,
};

interface ShowToastAction {
  type: 'error' | 'success' | 'warn' | 'info';
  title?: string;
  message: string;
  duration: number;
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastAction>) => {
      if (state) {
        state.status = true;
        state.type = action.payload.type;
        state.title = action.payload?.title ?? '';
        state.message = action.payload.message;
        state.duration = action.payload.duration;
      }
    },
    hideToast: (state) => {
      if (state) {
        state.status = false;
      }
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;