import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  TouchableOpacity, Modal, TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getGoals, addGoal } from '../redux/thunks/goalThunk';
import GoalCard from '../components/GoalCard';
import StreakCard from '../components/StreakCard';
import { Colors } from '../utils/colors';

const MOCK_GOALS = [
  { _id: '1', title: 'Emergency Fund', targetAmount: 100000, savedAmount: 72000, status: 'On track' },
  { _id: '2', title: 'New Laptop', targetAmount: 80000, savedAmount: 30400, status: 'Needs boost' },
  { _id: '3', title: 'Goa Trip', targetAmount: 50000, savedAmount: 10000, status: 'Behind' },
];

const GoalsScreen = () => {
  const dispatch = useDispatch();
  const { goals } = useSelector((state: RootState) => state.goal);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');

  useEffect(() => {
    dispatch(getGoals() as any);
  }, []);

  const displayGoals = goals.length > 0 ? goals : MOCK_GOALS;

  const handleAddGoal = () => {
    if (!newTitle || !newTarget) return;
    dispatch(addGoal({ title: newTitle, targetAmount: parseFloat(newTarget), savedAmount: 0, deadline: '' }) as any);
    setModalVisible(false);
    setNewTitle('');
    setNewTarget('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Goals</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.newLink}>+ New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <StreakCard streak={7} personalBest={12} activeDays={5} />
          {displayGoals.map((g: any) => (
            <GoalCard
              key={g._id}
              title={g.title}
              targetAmount={g.targetAmount}
              savedAmount={g.savedAmount}
              status={g.status || 'On track'}
            />
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>New Goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal title"
              placeholderTextColor={Colors.TEXT_MUTED}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Target amount"
              placeholderTextColor={Colors.TEXT_MUTED}
              keyboardType="numeric"
              value={newTarget}
              onChangeText={setNewTarget}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={handleAddGoal}>
              <Text style={styles.saveBtnText}>Create Goal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.SCREEN_BG },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  title: { fontSize: 20, fontWeight: '700', color: Colors.TEXT_PRIMARY },
  newLink: { color: Colors.PRIMARY, fontWeight: '600', fontSize: 14 },
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  modalBox: { backgroundColor: Colors.WHITE, borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: Colors.TEXT_PRIMARY, marginBottom: 16 },
  input: { backgroundColor: Colors.SURFACE, borderRadius: 10, padding: 12, fontSize: 14, color: Colors.TEXT_PRIMARY, marginBottom: 12 },
  saveBtn: { backgroundColor: Colors.PRIMARY, borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 10 },
  saveBtnText: { color: Colors.WHITE, fontWeight: '700' },
  cancelText: { textAlign: 'center', color: Colors.TEXT_MUTED, fontSize: 13 },
});

export default GoalsScreen;
