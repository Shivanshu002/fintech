import React from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity,
  TextInput, ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../utils/colors';

const TYPES = ['Expense', 'Income', 'Transfer'];
const CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'];

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const BottomSheet: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const [type, setType] = React.useState('Expense');
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('Food');
  const [note, setNote] = React.useState('');
  const [date, setDate] = React.useState('Apr 1, 2026');
  const [account, setAccount] = React.useState('Savings');

  const handleSave = () => {
    onSave({ amount: parseFloat(amount) || 0, type: type.toLowerCase(), category, date, note, account });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Add transaction</Text>

        <View style={styles.typeRow}>
          {TYPES.map(t => (
            <TouchableOpacity key={t} style={[styles.typePill, type === t && styles.typePillActive]} onPress={() => setType(t)}>
              <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          placeholder="₹ 0"
          keyboardType="numeric"
          placeholderTextColor={Colors.TEXT_MUTED}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map(c => (
            <TouchableOpacity key={c} style={[styles.catPill, category === c && styles.catPillActive]} onPress={() => setCategory(c)}>
              <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate} placeholderTextColor={Colors.TEXT_MUTED} />
          </View>
          <View style={[styles.halfInput, { marginLeft: 10 }]}>
            <Text style={styles.label}>Account</Text>
            <TextInput style={styles.input} value={account} onChangeText={setAccount} placeholderTextColor={Colors.TEXT_MUTED} />
          </View>
        </View>

        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Add a note..."
          placeholderTextColor={Colors.TEXT_MUTED}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save transaction</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { backgroundColor: Colors.WHITE, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 36 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.PRIMARY_LIGHT, alignSelf: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700', color: Colors.TEXT_PRIMARY, marginBottom: 16 },
  typeRow: { flexDirection: 'row', backgroundColor: Colors.PRIMARY_BG, borderRadius: 20, padding: 4, marginBottom: 16 },
  typePill: { flex: 1, paddingVertical: 6, borderRadius: 16, alignItems: 'center' },
  typePillActive: { backgroundColor: Colors.PRIMARY },
  typeText: { fontSize: 13, color: Colors.PRIMARY, fontWeight: '500' },
  typeTextActive: { color: Colors.PRIMARY_BG },
  label: { fontSize: 12, color: Colors.TEXT_SECONDARY, marginBottom: 6 },
  amountInput: { backgroundColor: Colors.SURFACE, borderRadius: 10, padding: 14, fontSize: 20, color: Colors.TEXT_PRIMARY, marginBottom: 14 },
  catScroll: { marginBottom: 14 },
  catPill: { borderWidth: 1, borderColor: Colors.TEXT_MUTED, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginRight: 8 },
  catPillActive: { backgroundColor: Colors.PRIMARY_MID, borderColor: Colors.PRIMARY_MID },
  catText: { fontSize: 12, color: Colors.TEXT_MUTED },
  catTextActive: { color: Colors.PRIMARY_BG },
  row: { flexDirection: 'row', marginBottom: 14 },
  halfInput: { flex: 1 },
  input: { backgroundColor: Colors.SURFACE, borderRadius: 10, padding: 12, fontSize: 14, color: Colors.TEXT_PRIMARY, marginBottom: 14 },
  saveBtn: { backgroundColor: Colors.PRIMARY, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 4 },
  saveBtnText: { color: Colors.WHITE, fontSize: 15, fontWeight: '700' },
});

export default BottomSheet;
