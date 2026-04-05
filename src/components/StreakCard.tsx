import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface Props {
  streak: number;
  personalBest: number;
  activeDays: number;
}

const StreakCard: React.FC<Props> = ({ streak, personalBest, activeDays }) => (
  <View style={styles.card}>
    <Text style={styles.label}>No-spend streak</Text>
    <Text style={styles.days}>{streak} days</Text>
    <Text style={styles.sub}>Personal best: {personalBest} days</Text>
    <View style={styles.dotsRow}>
      {DAYS.map((d, i) => {
        const isDone = i < activeDays - 1;
        const isToday = i === activeDays - 1;
        return (
          <View key={i} style={[styles.dot, isDone && styles.dotDone, isToday && styles.dotToday, !isDone && !isToday && styles.dotFuture]}>
            <Text style={[styles.dotText, isDone && styles.dotTextDone, isToday && styles.dotTextToday, !isDone && !isToday && styles.dotTextFuture]}>{d}</Text>
          </View>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.PRIMARY_DARK, borderRadius: 16, padding: 18, marginBottom: 16 },
  label: { color: Colors.PRIMARY_MID, fontSize: 12, marginBottom: 4 },
  days: { color: Colors.PRIMARY_BG, fontSize: 20, fontWeight: 'bold', marginBottom: 2 },
  sub: { color: Colors.PRIMARY, fontSize: 12, marginBottom: 14 },
  dotsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dot: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: Colors.PRIMARY },
  dotToday: { backgroundColor: Colors.PRIMARY_MID },
  dotFuture: { backgroundColor: '#0C447C' },
  dotText: { fontSize: 12, fontWeight: '600' },
  dotTextDone: { color: Colors.PRIMARY_BG },
  dotTextToday: { color: Colors.WHITE, fontWeight: 'bold' },
  dotTextFuture: { color: Colors.PRIMARY_MID },
});

export default StreakCard;
