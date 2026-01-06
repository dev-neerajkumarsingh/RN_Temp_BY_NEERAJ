import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PopupState {
  status: boolean;
  title: string;
  buttonLabel: string;
  onPressType?: string;
}

const initialState: PopupState | undefined = {
  status: false,
  title: '',
  buttonLabel: '',
  onPressType: '',
};

interface ShowPopupAction {
  title: string;
  buttonLabel: string;
  onPressType?: string;
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<ShowPopupAction>) => {
      if (state) {
        state.status = true;
        state.title = action.payload.title;
        state.buttonLabel = action.payload.buttonLabel;
        state.onPressType = Boolean(action.payload?.onPressType) ? action.payload?.onPressType : '';
      }
    },
    hidePopup: (state) => {
      if (state) {
        state.status = false;
        state.title = '';
        state.buttonLabel = '';
        state.onPressType = '';
      }
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;