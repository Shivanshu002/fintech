import { doPost } from '../../services';
import { Routes } from '../../utils/routers';
import {
  loginStart, loginSuccess, loginFailure,
  RegistStart, RegistSuccess, RegistFailure,
} from '../slices/authSlice';

export const loginUser =
  (email: string, password: string, onSuccess?: () => void) =>
  async (dispatch: any) => {
    try {
      dispatch(loginStart());
      const data = await doPost(Routes.url.user.login, { email, password });
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      onSuccess?.();
    } catch {
      dispatch(loginFailure('Invalid email or password'));
    }
  };

export const RegistUser =
  (name: string, email: string, password: string, onSuccess?: () => void) =>
  async (dispatch: any) => {
    try {
      dispatch(RegistStart());
      const data = await doPost(Routes.url.user.register, { name, email, password });
      dispatch(RegistSuccess({ token: data.token, user: data.user }));
      onSuccess?.();
    } catch {
      dispatch(RegistFailure('Registration failed. Please try again.'));
    }
  };
