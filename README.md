# 💰 Personal Finance App

A React Native app to track expenses, manage savings goals, and visualize spending insights.

---

## Tech Stack

- **React Native** — Mobile UI
- **Redux Toolkit** — State management
- **React Navigation** — Screen navigation
- **AsyncStorage** — Persist auth token locally
- **REST API** — Backend at `fintech-backend-427x.onrender.com`

---

## Getting Started

```sh
# Install dependencies
npm install

# Start Metro
npm start

# Run on Android
npm run android

# Run on iOS
bundle exec pod install
npm run ios
```

---

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── BalanceCard.tsx      # Shows total balance, income, expense
│   ├── WeekChart.tsx        # Bar chart for weekly spending
│   ├── TransactionItem.tsx  # Single transaction row
│   ├── GoalCard.tsx         # Savings goal progress card
│   ├── StreakCard.tsx        # Saving streak tracker
│   └── BottomSheet.tsx      # Add transaction bottom sheet
│
├── screens/             # One file per app screen
│   ├── AuthScreen.tsx       # Login & Register
│   ├── HomeScreen.tsx       # Dashboard
│   ├── TransactionsScreen.tsx
│   ├── GoalsScreen.tsx
│   ├── InsightsScreen.tsx
│   └── ProfileScreen.tsx
│
├── redux/               # State management (Redux Toolkit)
│   ├── store.ts             # Root store — combines all reducers
│   ├── slices/              # State shape + reducers per feature
│   │   ├── authSlice.ts
│   │   ├── transactionSlice.ts
│   │   ├── goalSlice.ts
│   │   └── insightSlice.ts
│   └── thunks/              # Async API calls per feature
│       ├── authThunk.ts
│       ├── transactionThunk.ts
│       ├── goalThunk.ts
│       └── insightThunk.ts
│
├── services/
│   └── index.ts         # HTTP helpers — doGet, doPost, doPatch, doDelete
│
├── constants/           # Mock/fallback data used when API is empty
│   ├── home.ts              # MOCK_WEEKLY, MOCK_TXNS
│   ├── goals.ts             # MOCK_GOALS
│   └── insights.ts          # MOCK_CATEGORIES, DAILY, CAT_BREAKDOWN
│
└── utils/
    ├── colors.ts        # App color palette
    └── routers.ts       # All API endpoint paths
```

---

## Redux Workflow

Every feature follows the same 3-layer pattern:

```
Screen  →  Thunk  →  API  →  Slice  →  Store  →  Screen
```

### Step-by-step

```
1. Screen dispatches a thunk
      dispatch(getTransactions())

2. Thunk calls the API via services/index.ts
      const data = await doGet(Routes.url.transactions.list)

3. Thunk dispatches slice actions based on result
      dispatch(setTransactions(data))   ← success
      dispatch(setError('Failed'))      ← failure

4. Slice updates the state
      state.transactions = action.payload

5. Screen reads updated state via useSelector
      const { transactions } = useSelector(state => state.transaction)
```

### Example — Auth flow

```
AuthScreen
  └── dispatch(loginUser(email, password))        ← thunk
        ├── dispatch(loginStart())                 ← sets loading: true
        ├── doPost('auth/login', { email, password })
        ├── dispatch(loginSuccess({ token, user }))← sets isLoggedIn: true
        └── dispatch(loginFailure('...'))          ← sets error message
```

### Store slices

| Slice         | State keys                                      |
|---------------|-------------------------------------------------|
| `auth`        | `user`, `token`, `isLoggedIn`, `loading`, `error` |
| `transaction` | `transactions`, `summary`, `loading`, `error`   |
| `goal`        | `goals`, `loading`, `error`                     |
| `insight`     | `categories`, `weekComparison`, `loading`       |

---

## API Endpoints

All routes are defined in `src/utils/routers.ts`.

| Feature      | Method | Endpoint                        |
|--------------|--------|---------------------------------|
| Login        | POST   | `auth/login`                    |
| Register     | POST   | `auth/register`                 |
| Transactions | GET    | `transactions`                  |
| Summary      | GET    | `transactions/summary`          |
| Goals        | GET    | `goals`                         |
| Add Goal     | POST   | `goals`                         |
| Insights     | GET    | `insights/categories`           |
| Week Compare | GET    | `insights/week-comparison`      |

---

## Screens Overview

| Screen         | Description                              |
|----------------|------------------------------------------|
| Auth           | Login / Register with form validation    |
| Home           | Balance card, weekly chart, recent txns  |
| Transactions   | Full list with search + add new          |
| Goals          | Savings goals with progress bars         |
| Insights       | Category breakdown + week comparison     |
| Profile        | User info + logout                       |
