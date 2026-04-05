import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { AvatarButton } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getTransactionSummary, getTransactions } from '../redux/thunks/transactionThunk';
import BalanceCard from '../components/BalanceCard';
import WeekChart from '../components/WeekChart';
import TransactionItem from '../components/TransactionItem';
import { Colors } from '../utils/colors';
import { MOCK_WEEKLY, MOCK_TXNS } from '../constants/home';

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
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <Text style={styles.greeting}>Good morning, <Text style={styles.name}>{user?.name || 'Shiv'}</Text></Text>
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
              name={txn.note || txn.name || txn.category}
              category={txn.category}
              date={txn.date ? new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : txn.date}
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
  scrollContent: { paddingBottom: 96 },
  topBar: { paddingHorizontal: 16, paddingVertical: 12 },
  greeting: { fontSize: 13, color: Colors.TEXT_MUTED },
  name: { fontSize: 16, fontWeight: 'bold', color: Colors.TEXT_PRIMARY },
  section: { backgroundColor: Colors.WHITE, borderRadius: 14, marginHorizontal: 16, marginBottom: 16, padding: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.TEXT_PRIMARY, marginBottom: 8 },
});

export default HomeScreen;
