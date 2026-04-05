import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getTransactionSummary, getTransactions } from '../redux/thunks/transactionThunk';
import BalanceCard from '../components/BalanceCard';
import WeekChart from '../components/WeekChart';
import TransactionItem from '../components/TransactionItem';
import { Colors } from '../utils/colors';

const MOCK_WEEKLY = [3200, 1800, 4500, 2900, 6800, 8200, 4600];
const MOCK_TXNS = [
  { _id: '1', icon: '🛒', name: 'Groceries', category: 'Food', date: 'Today', amount: 850, type: 'expense' as const },
  { _id: '2', icon: '💼', name: 'Freelance', category: 'Income', date: 'Yesterday', amount: 8000, type: 'income' as const },
  { _id: '3', icon: '🚗', name: 'Petrol', category: 'Transport', date: 'Mon', amount: 500, type: 'expense' as const },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { summary, transactions } = useSelector((state: RootState) => state.transaction);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getTransactionSummary() as any);
    dispatch(getTransactions() as any);
  }, []);

  const displayTxns = transactions.length > 0 ? transactions.slice(0, 5) : MOCK_TXNS;
  const today = new Date().getDay();
  const currentDayIndex = today === 0 ? 6 : today - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.name}>{user?.name || 'Shiv'}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'S')[0].toUpperCase()}</Text>
          </View>
        </View>

        <BalanceCard
          balance={summary.balance || 42850}
          income={summary.income || 68000}
          expense={summary.expense || 25150}
        />

        <WeekChart data={MOCK_WEEKLY} currentDayIndex={currentDayIndex} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent transactions</Text>
          {displayTxns.map((txn: any) => (
            <TransactionItem
              key={txn._id}
              icon={txn.icon || '💳'}
              name={txn.name || txn.category}
              category={txn.category}
              date={txn.date}
              amount={txn.amount}
              type={txn.type}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.SCREEN_BG },
  scroll: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  greeting: { fontSize: 12, color: Colors.TEXT_MUTED },
  name: { fontSize: 18, fontWeight: 'bold', color: Colors.TEXT_PRIMARY },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.PRIMARY_BG, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Colors.PRIMARY, fontWeight: '700', fontSize: 16 },
  section: { backgroundColor: Colors.WHITE, borderRadius: 14, marginHorizontal: 16, marginBottom: 16, padding: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.TEXT_PRIMARY, marginBottom: 8 },
});

export default HomeScreen;
