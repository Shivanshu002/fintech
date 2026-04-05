import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  _id: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  date: string;
  note: string;
  account: string;
}

interface Summary {
  income: number;
  expense: number;
  balance: number;
}

interface TransactionState {
  transactions: Transaction[];
  summary: Summary;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  summary: { income: 0, expense: 0, balance: 0 },
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    fetchTransactionsStart(state) { state.loading = true; state.error = null; },
    fetchTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.loading = false; state.transactions = action.payload;
    },
    fetchTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    fetchSummaryStart(state) { state.loading = true; },
    fetchSummarySuccess(state, action: PayloadAction<Summary>) {
      state.loading = false; state.summary = action.payload;
    },
    fetchSummaryFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    addTransactionStart(state) { state.loading = true; state.error = null; },
    addTransactionSuccess(state, action: PayloadAction<Transaction>) {
      state.loading = false; state.transactions.unshift(action.payload);
    },
    addTransactionFailure(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    updateTransactionSuccess(state, action: PayloadAction<Transaction>) {
      state.loading = false;
      const idx = state.transactions.findIndex(t => t._id === action.payload._id);
      if (idx !== -1) state.transactions[idx] = action.payload;
    },
    deleteTransactionSuccess(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(t => t._id !== action.payload);
    },
  },
});

export const {
  fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure,
  fetchSummaryStart, fetchSummarySuccess, fetchSummaryFailure,
  addTransactionStart, addTransactionSuccess, addTransactionFailure,
  updateTransactionSuccess, deleteTransactionSuccess,
} = transactionSlice.actions;

export default transactionSlice.reducer;
