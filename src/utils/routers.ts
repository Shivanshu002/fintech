export const Routes = {
  url: {
    user: {
      login: 'auth/login',
      register: 'auth/register',
      forgotPassword: 'user/forgot-password',
      verifyOtp: 'user/verify-otp',
      resetPassword: 'user/reset-password',
      profile: 'users/me',
    },
    transactions: {
      list: 'transactions',
      summary: 'transactions/summary',
      single: (id: string) => `transactions/${id}`,
    },
    goals: {
      list: 'goals',
      summary: 'goals/summary',
      single: (id: string) => `goals/${id}`,
      addAmount: (id: string) => `goals/${id}/add-amount`,
    },
    insights: {
      categories: 'insights/categories',
      weekComparison: 'insights/week-comparison',
      monthlyTrend: 'insights/monthly-trend',
      smart: 'insights/smart',
    },
  },
};
