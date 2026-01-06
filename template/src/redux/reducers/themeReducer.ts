import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';
import {lightTheme, darkTheme, AppTheme} from '@themes';

// Define a type for the slice state
export interface ThemeState {
  theme: AppTheme;
}

// Define the initial state using that type
export const initialState: ThemeState = {
  theme: Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,
};

interface ThemeAction {
  prevTheme: AppTheme;
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    selectTheme: (state, action: PayloadAction<ThemeAction>) => {
      state.theme = action.payload.prevTheme;
    },
    defaultTheme: state => {
      state.theme = lightTheme; // Reset to default theme
    },
  },
});

export const {selectTheme, defaultTheme} = themeSlice.actions;

export default themeSlice.reducer;
