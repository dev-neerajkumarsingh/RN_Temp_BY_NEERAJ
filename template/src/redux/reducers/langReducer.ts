import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface LangState {
  selectedLang: string;
}

// Define the initial state using that type
export const initialState: LangState = {
  selectedLang: ''
};

interface LangAction {
  prevLang: string;
} 

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    selectLang: (state, action: PayloadAction<LangAction>) => {
      state.selectedLang = action.payload.prevLang;
    },
    defaultLang: (state) => {
      state.selectedLang = 'en';
    },
  },
});

export const {selectLang, defaultLang} = langSlice.actions;

export default langSlice.reducer;