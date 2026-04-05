import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transactionReducer from './slices/transactionSlice';
import goalReducer from './slices/goalSlice';
import insightReducer from './slices/insightSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    goal: goalReducer,
    insight: insightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
