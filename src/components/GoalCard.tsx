import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

interface Props {
  title: string;
  targetAmount: number;
  savedAmount: number;
  status: string;
}

const statusStyle = (status: string) => {
  if (status === 'On track') return { bg: Colors.PRIMARY_BG, text: Colors.PRIMARY };
  if (status === 'Needs boost') return { bg: Colors.PRIMARY_BG, text: Colors.DEEP };
  return { bg: Colors.WARNING_BG, text: '#791F1F' };
};

const progressColor = (status: string) => {
  if (status === 'On track') return Colors.PRIMARY_MID;
  if (status === 'Needs boost') return Colors.PRIMARY_LIGHT;
  return '#E24B4A';
};

const GoalCard: React.FC<Props> = ({ title, targetAmount, savedAmount, status }) => {
  const pct = Math.min((savedAmount / targetAmount) * 100, 100);
  const s = statusStyle(status);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: s.bg }]}>
          <Text style={[styles.badgeText, { color: s.text }]}>{status}</Text>
        </View>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: progressColor(status) }]} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.muted}>₹{savedAmount.toLocaleString('en-IN')} saved</Text>
        <Text style={styles.muted}>Goal: ₹{targetAmount.toLocaleString('en-IN')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.SURFACE, borderRadius: 12, padding: 14, marginBottom: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.TEXT_PRIMARY },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '500' },
  barBg: { height: 7, backgroundColor: 'rgba(0,0,0,0.09)', borderRadius: 4, marginBottom: 8 },
  barFill: { height: 7, borderRadius: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  muted: { fontSize: 11, color: Colors.TEXT_MUTED },
});

export default GoalCard;
