import { doGet, doPost, doPatch, doDelete, authHeader } from '../../services';
import { Routes } from '../../utils/routers';
import {
  fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure,
  fetchSummaryStart, fetchSummarySuccess, fetchSummaryFailure,
  addTransactionStart, addTransactionSuccess, addTransactionFailure,
  updateTransactionSuccess, deleteTransactionSuccess,
} from '../slices/transactionSlice';
import { RootState } from '../store';

export const getTransactions =
  (filters?: any) => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(fetchTransactionsStart());
      const token = getState().auth.token!;
      const params = filters ? '?' + new URLSearchParams(filters).toString() : '';
      const data = await doGet(Routes.url.transactions.list + params, authHeader(token));
      // API may return array directly or wrapped
      const list = Array.isArray(data) ? data : (data.data ?? data.transactions ?? []);
      dispatch(fetchTransactionsSuccess(list));
    } catch {
      dispatch(fetchTransactionsFailure('Failed to fetch transactions'));
    }
  };

export const getTransactionSummary =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(fetchSummaryStart());
      const token = getState().auth.token!;
      const data = await doGet(Routes.url.transactions.summary, authHeader(token));
      dispatch(fetchSummarySuccess(data));
    } catch {
      dispatch(fetchSummaryFailure('Failed to fetch summary'));
    }
  };

export const addTransaction =
  (payload: any, onSuccess?: () => void) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(addTransactionStart());
      const token = getState().auth.token!;
      await doPost(Routes.url.transactions.list, payload, authHeader(token));
      // Refetch full list so UI is always in sync
      const params = '';
      const data = await doGet(Routes.url.transactions.list + params, authHeader(token));
      const list = Array.isArray(data) ? data : (data.data ?? data.transactions ?? []);
      dispatch(fetchTransactionsSuccess(list));
      onSuccess?.();
    } catch {
      dispatch(addTransactionFailure('Failed to add transaction'));
    }
  };

export const updateTransaction =
  (id: string, payload: any, onSuccess?: () => void) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      const token = getState().auth.token!;
      const data = await doPatch(Routes.url.transactions.single(id), payload, authHeader(token));
      dispatch(updateTransactionSuccess(data));
      onSuccess?.();
    } catch {
      console.error('Update transaction failed');
    }
  };

export const deleteTransaction =
  (id: string, onSuccess?: () => void) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      const token = getState().auth.token!;
      await doDelete(Routes.url.transactions.single(id), undefined, authHeader(token));
      dispatch(deleteTransactionSuccess(id));
      onSuccess?.();
    } catch {
      console.error('Delete transaction failed');
    }
  };
