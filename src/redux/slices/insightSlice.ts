import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InsightState {
  categories: any[];
  weekComparison: any;
  monthlyTrend: any[];
  smartTips: string[];
  loading: boolean;
  error: string | null;
}

const initialState: InsightState = {
  categories: [],
  weekComparison: null,
  monthlyTrend: [],
  smartTips: [],
  loading: false,
  error: null,
};

const insightSlice = createSlice({
  name: 'insight',
  initialState,
  reducers: {
    fetchInsightsStart(state) { state.loading = true; state.error = null; },
    fetchCategoriesSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false; state.categories = action.payload;
    },
    fetchWeekComparisonSuccess(state, action: PayloadAction<any>) {
      state.loading = false; state.weekComparison = action.payload;
    },
    fetchMonthlyTrendSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false; state.monthlyTrend = action.payload;
    },
    fetchSmartInsightsSuccess(state, action: PayloadAction<{ tips: string[]; categoryBreakdown: any[]; weekComparison: any }>) {
      state.loading = false;
      state.smartTips = action.payload.tips;
      state.categories = action.payload.categoryBreakdown;
      state.weekComparison = action.payload.weekComparison;
    },
    fetchInsightsFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
  },
});

export const {
  fetchInsightsStart, fetchCategoriesSuccess, fetchWeekComparisonSuccess,
  fetchMonthlyTrendSuccess, fetchSmartInsightsSuccess, fetchInsightsFailure,
} = insightSlice.actions;

export default insightSlice.reducer;
