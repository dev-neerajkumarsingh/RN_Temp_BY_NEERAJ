import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorState {
  status: boolean;
  title: string;
  message: string;
  buttonLabel: 'Try again' | 'Ok';
  networkConfig: any | undefined;
}

const initialState: ErrorState | undefined = {
  status: false,
  title: '',
  message: '',
  buttonLabel: 'Try again',
  networkConfig: null,
};

interface ShowToastAction {
  title: string;
  message: string;
  buttonLabel: 'Try again' | 'Ok';
  networkConfig: any | undefined;
}

const errorScreenSlice = createSlice({
  name: 'errorScreen',
  initialState,
  reducers: {
    showErrorScreen: (state, action: PayloadAction<ShowToastAction>) => {
      if (state) {
        state.status = true;
        state.title = action.payload.title;
        state.message = action.payload.message;
        state.buttonLabel = action.payload.buttonLabel;
        state.networkConfig = action.payload.networkConfig;
      }
    },
    hideErrorScreen: (state) => {
      if (state) {
        state.status = false;
        state.title = '';
        state.message = '';
        state.networkConfig = null;
      }
    },
  },
});

export const { showErrorScreen, hideErrorScreen } = errorScreenSlice.actions;
export default errorScreenSlice.reducer;