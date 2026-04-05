import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: any;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) { state.loading = true; state.error = null; },
    loginSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      AsyncStorage.setItem('token', action.payload.token);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    RegistStart(state) { state.loading = true; state.error = null; },
    RegistSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      AsyncStorage.setItem('token', action.payload.token);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    RegistFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    setUserFromStorage(state, action: PayloadAction<{ token: string; user: any }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
});

export const {
  loginStart, loginSuccess, loginFailure,
  RegistStart, RegistSuccess, RegistFailure,
  logout, setUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
