import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Props {
  data: number[];
  currentDayIndex: number;
}

const WeekChart: React.FC<Props> = ({ data, currentDayIndex }) => {
  const max = Math.max(...data, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly spending</Text>
      <View style={styles.chart}>
        {data.map((val, i) => {
          const heightPct = (val / max) * 100;
          const isToday = i === currentDayIndex;
          const isHighest = val === max;
          const barColor = isToday ? Colors.PRIMARY_MID : isHighest ? Colors.PRIMARY : '#B5D4F4';
          return (
            <View key={i} style={styles.barCol}>
              <View style={styles.barWrapper}>
                <View style={[styles.bar, { height: `${heightPct}%`, backgroundColor: barColor }]} />
              </View>
              <Text style={[styles.dayLabel, isToday && styles.dayLabelActive]}>
                {DAYS[i].slice(0, 3)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_BG,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  title: { color: Colors.PRIMARY, fontSize: 13, fontWeight: '600', marginBottom: 12 },
  chart: { flexDirection: 'row', height: 80, alignItems: 'flex-end' },
  barCol: { flex: 1, alignItems: 'center' },
  barWrapper: { flex: 1, width: '60%', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: 4, minHeight: 4 },
  dayLabel: { fontSize: 10, color: Colors.TEXT_MUTED, marginTop: 4 },
  dayLabelActive: { color: Colors.PRIMARY, fontWeight: '600' },
});

export default WeekChart;
