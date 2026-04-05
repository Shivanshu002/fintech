import { doGet, doPost, doPatch, doDelete, authHeader } from '../../services';
import { Routes } from '../../utils/routers';
import {
  fetchGoalsStart, fetchGoalsSuccess, fetchGoalsFailure,
  addGoalStart, addGoalSuccess, addGoalFailure,
  updateGoalSuccess, deleteGoalSuccess, fetchGoalSummarySuccess,
} from '../slices/goalSlice';
import { RootState } from '../store';

export const getGoals =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(fetchGoalsStart());
      const token = getState().auth.token!;
      const data = await doGet(Routes.url.goals.list, authHeader(token));
      dispatch(fetchGoalsSuccess(data));
    } catch {
      dispatch(fetchGoalsFailure('Failed to fetch goals'));
    }
  };

export const getGoalSummary =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      const token = getState().auth.token!;
      const data = await doGet(Routes.url.goals.summary, authHeader(token));
      dispatch(fetchGoalSummarySuccess(data));
    } catch {
      console.error('Goal summary failed');
    }
  };

export const addGoal =
  (payload: any, onSuccess?: () => void) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(addGoalStart());
      const token = getState().auth.token!;
      const data = await doPost(Routes.url.goals.list, payload, authHeader(token));
      dispatch(addGoalSuccess(data));
      onSuccess?.();
    } catch {
      dispatch(addGoalFailure('Failed to add goal'));
    }
  };

export const addAmountToGoal =
  (id: string, amount: number, onSuccess?: () => void) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      const token = getState().auth.token!;
      const data = await doPost(Routes.url.goals.addAmount(id), { amount }, authHeader(token));
      dispatch(updateGoalSuccess(data));
      onSuccess?.();
    } catch {
      console.error('Add amount failed');
    }
  };

export const updateGoal =
  (id: string, payload: any, onSuccess?: () => void) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      const token = getState().auth.token!;
      const data = await doPatch(Routes.url.goals.single(id), payload, authHeader(token));
      dispatch(updateGoalSuccess(data));
      onSuccess?.();
    } catch {
      console.error('Update goal failed');
    }
  };

export const deleteGoal =
  (id: string, onSuccess?: () => void) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      const token = getState().auth.token!;
      await doDelete(Routes.url.goals.single(id), undefined, authHeader(token));
      dispatch(deleteGoalSuccess(id));
      onSuccess?.();
    } catch {
      console.error('Delete goal failed');
    }
  };
