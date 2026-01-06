import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface LoaderState {
  status: boolean;
}

// Define the initial state using that type
export const initialState: LoaderState = {
  status: false
};

export const loaderSlice = createSlice({
  name: 'loader',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showLoader: (state) => {
      state.status = true;
    },
    hideLoader: (state) => {
      state.status = false;
    },
  },
});

export const {showLoader, hideLoader} = loaderSlice.actions;

export default loaderSlice.reducer;