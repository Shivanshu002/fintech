import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

interface Props {
  icon: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
}

const TransactionItem: React.FC<Props> = ({ icon, name, category, date, amount, type }) => (
  <View style={styles.row}>
    <View style={styles.iconBox}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
    <View style={styles.center}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.sub}>{category} · {date}</Text>
    </View>
    <Text style={[styles.amount, { color: type === 'income' ? Colors.SUCCESS : Colors.DANGER }]}>
      {type === 'income' ? '+' : '-'}₹{Math.abs(amount).toLocaleString('en-IN')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  iconBox: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: Colors.PRIMARY_BG,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  icon: { fontSize: 18 },
  center: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: Colors.TEXT_PRIMARY },
  sub: { fontSize: 12, color: Colors.TEXT_MUTED, marginTop: 2 },
  amount: { fontSize: 14, fontWeight: '600' },
});

export default TransactionItem;
