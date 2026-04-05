import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Goal {
  _id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  icon: string;
}

interface GoalState {
  goals: Goal[];
  summary: { active: number; completed: number; total: number };
  loading: boolean;
  error: string | null;
}

const initialState: GoalState = {
  goals: [],
  summary: { active: 0, completed: 0, total: 0 },
  loading: false,
  error: null,
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    fetchGoalsStart(state) { state.loading = true; state.error = null; },
    fetchGoalsSuccess(state, action: PayloadAction<Goal[]>) {
      state.loading = false; state.goals = action.payload;
    },
    fetchGoalsFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    addGoalStart(state) { state.loading = true; state.error = null; },
    addGoalSuccess(state, action: PayloadAction<Goal>) {
      state.loading = false; state.goals.unshift(action.payload);
    },
    addGoalFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    updateGoalSuccess(state, action: PayloadAction<Goal>) {
      state.loading = false;
      const idx = state.goals.findIndex(g => g._id === action.payload._id);
      if (idx !== -1) state.goals[idx] = action.payload;
    },
    deleteGoalSuccess(state, action: PayloadAction<string>) {
      state.goals = state.goals.filter(g => g._id !== action.payload);
    },
    fetchGoalSummarySuccess(state, action: PayloadAction<{ active: number; completed: number; total: number }>) {
      state.summary = action.payload;
    },
  },
});

export const {
  fetchGoalsStart, fetchGoalsSuccess, fetchGoalsFailure,
  addGoalStart, addGoalSuccess, addGoalFailure,
  updateGoalSuccess, deleteGoalSuccess, fetchGoalSummarySuccess,
} = goalSlice.actions;

export default goalSlice.reducer;
