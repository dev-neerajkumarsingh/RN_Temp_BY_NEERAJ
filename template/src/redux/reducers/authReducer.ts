import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {AuthServices} from '@network';

export interface AuthState {
  isAuthenticated: boolean;
  userData: any;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState | undefined = {
  isAuthenticated: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
};

// export const updateToken = async (refreshToken: string) => {
//   if (refreshToken) {
//     const res = await AuthServices.updateToken({refreshToken});
//     if(res.success) {
//       return res.data;
//     } else {
//       return null;
//     }
//   }
// };

interface LoginDataAction {
  userData: any;
  accessToken: string;
  refreshToken: string;
}

interface UpdateTokenAction {
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginReducer: (state, action: PayloadAction<LoginDataAction>) => {
      if (state) {
        state.isAuthenticated = true;
        state.userData = action.payload?.userData;
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
      }
    },
    logoutReducer: state => {
      if (state) {
        state.accessToken = null;
        state.refreshToken = null;
        state.userData = null;
        state.isAuthenticated = false;
      }
    },
    refreshTokenReducer: (state, action: PayloadAction<UpdateTokenAction>) => {
      if (state) {
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
      }
    }
  },
});

export const {loginReducer, logoutReducer, refreshTokenReducer} = authSlice.actions;
export default authSlice.reducer;
