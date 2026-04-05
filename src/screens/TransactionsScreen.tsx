import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TouchableOpacity, TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getTransactions, addTransaction } from '../redux/thunks/transactionThunk';
import TransactionItem from '../components/TransactionItem';
import BottomSheet from '../components/BottomSheet';
import { Colors } from '../utils/colors';

const MOCK_TXNS = [
  { _id: '1', icon: '🛒', name: 'Groceries', category: 'Food', date: 'Today', amount: 850, type: 'expense' as const },
  { _id: '2', icon: '💼', name: 'Freelance', category: 'Income', date: 'Yesterday', amount: 8000, type: 'income' as const },
  { _id: '3', icon: '🚗', name: 'Petrol', category: 'Transport', date: 'Mon', amount: 500, type: 'expense' as const },
];

const TransactionsScreen = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state: RootState) => state.transaction);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getTransactions() as any);
  }, []);

  const displayTxns = transactions.length > 0 ? transactions : MOCK_TXNS;
  const filtered = displayTxns.filter((t: any) =>
    (t.name || t.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: any) => {
    dispatch(addTransaction(data) as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setSheetVisible(true)}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={Colors.TEXT_MUTED}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: any) => (
          <TransactionItem
            icon={item.icon || '💳'}
            name={item.name || item.category}
            category={item.category}
            date={item.date}
            amount={item.amount}
            type={item.type}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />

      <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} onSave={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.SCREEN_BG },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  title: { fontSize: 20, fontWeight: '700', color: Colors.TEXT_PRIMARY },
  addBtn: { backgroundColor: Colors.PRIMARY, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  addBtnText: { color: Colors.WHITE, fontWeight: '600', fontSize: 13 },
  searchBox: { paddingHorizontal: 16, marginBottom: 8 },
  searchInput: { backgroundColor: Colors.SURFACE, borderRadius: 10, padding: 12, fontSize: 14, color: Colors.TEXT_PRIMARY },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  sep: { height: 1, backgroundColor: Colors.SCREEN_BG },
});

export default TransactionsScreen;
