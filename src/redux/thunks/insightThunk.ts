import { doGet, authHeader } from '../../services';
import { Routes } from '../../utils/routers';
import {
  fetchInsightsStart, fetchCategoriesSuccess, fetchWeekComparisonSuccess,
  fetchMonthlyTrendSuccess, fetchSmartInsightsSuccess, fetchInsightsFailure,
} from '../slices/insightSlice';
import { RootState } from '../store';

export const getCategories =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(fetchInsightsStart());
      const token = getState().auth.token!;
      const data = await doGet(Routes.url.insights.categories, authHeader(token));
      dispatch(fetchCategoriesSuccess(data));
    } catch {
      dispatch(fetchInsightsFailure('Failed to fetch categories'));
    }
  };

export const getWeekComparison =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(fetchInsightsStart());
      const token = getState().auth.token!;
      const data = await doGet(Routes.url.insights.weekComparison, authHeader(token));
      dispatch(fetchWeekComparisonSuccess(data));
    } catch {
      dispatch(fetchInsightsFailure('Failed to fetch week comparison'));
    }
  };

export const getMonthlyTrend =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(fetchInsightsStart());
      const token = getState().auth.token!;
      const data = await doGet(Routes.url.insights.monthlyTrend, authHeader(token));
      dispatch(fetchMonthlyTrendSuccess(data));
    } catch {
      dispatch(fetchInsightsFailure('Failed to fetch monthly trend'));
    }
  };

export const getSmartInsights =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(fetchInsightsStart());
      const token = getState().auth.token!;
      const data = await doGet(Routes.url.insights.smart, authHeader(token));
      dispatch(fetchSmartInsightsSuccess(data));
    } catch {
      dispatch(fetchInsightsFailure('Failed to fetch insights'));
    }
  };
