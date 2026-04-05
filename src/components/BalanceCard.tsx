import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

interface Props {
  balance: number;
  income: number;
  expense: number;
}

const BalanceCard: React.FC<Props> = ({ balance, income, expense }) => {
  const saved = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Balance</Text>
      <Text style={styles.amount}>₹{balance.toLocaleString('en-IN')}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.colLabel}>Income</Text>
          <Text style={styles.colValue}>₹{income.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.col}>
          <Text style={styles.colLabel}>Expense</Text>
          <Text style={styles.colValue}>₹{expense.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.col}>
          <Text style={styles.colLabel}>Saved</Text>
          <Text style={styles.colValue}>{saved}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.PRIMARY_DARK,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  label: { color: Colors.PRIMARY_LIGHT, fontSize: 12, marginBottom: 6 },
  amount: { color: Colors.WHITE, fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  col: { flex: 1, alignItems: 'center' },
  divider: { width: 1, backgroundColor: '#1A4A7A' },
  colLabel: { color: Colors.PRIMARY_MID, fontSize: 11, marginBottom: 2 },
  colValue: { color: '#B5D4F4', fontSize: 13, fontWeight: '600' },
});

export default BalanceCard;
