import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getCategories, getWeekComparison } from '../redux/thunks/insightThunk';
import { Colors } from '../utils/colors';

const TABS = ['Categories', 'Week vs last', 'Monthly'];

const MOCK_CATEGORIES = [
  { name: 'Food', amount: 8600, pct: 72, color: Colors.PRIMARY_MID },
  { name: 'Transport', amount: 4800, pct: 40, color: Colors.PRIMARY_LIGHT },
  { name: 'Bills', amount: 3350, pct: 28, color: '#B5D4F4' },
  { name: 'Shopping', amount: 2400, pct: 20, color: Colors.PRIMARY },
];

const DAILY = [
  { day: 'Mon', tw: 320, lw: 280 }, { day: 'Tue', tw: 180, lw: 220 },
  { day: 'Wed', tw: 450, lw: 390 }, { day: 'Thu', tw: 290, lw: 310 },
  { day: 'Fri', tw: 680, lw: 510 }, { day: 'Sat', tw: 820, lw: 620 },
  { day: 'Sun', tw: 460, lw: 470 },
];

const CAT_BREAKDOWN = [
  { icon: '🛒', name: 'Food', diff: '+₹320 this week', diffUp: true, tw: 1240, lw: 920, twBar: 62, lwBar: 44 },
  { icon: '🚗', name: 'Transport', diff: '+₹50 this week', diffUp: false, tw: 750, lw: 700, twBar: 36, lwBar: 34 },
  { icon: '💡', name: 'Bills', diff: '-₹200 saved', diffUp: false, tw: 480, lw: 680, twBar: 23, lwBar: 33 },
];

const maxBar = 800;

const InsightsScreen = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.insight);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getCategories() as any);
    dispatch(getWeekComparison() as any);
  }, []);

  const displayCats = categories.length > 0 ? categories : MOCK_CATEGORIES;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <View style={styles.monthPill}><Text style={styles.monthText}>April 2026</Text></View>
        </View>

        <View style={styles.tabRow}>
          {TABS.map((tab, i) => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === i && styles.tabActive]} onPress={() => setActiveTab(i)}>
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          {activeTab === 0 && (
            <>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Spending by Category</Text>
                {displayCats.map((cat: any, i: number) => (
                  <View key={i} style={styles.catRow}>
                    <Text style={styles.catName}>{cat.name}</Text>
                    <View style={styles.catBarBg}>
                      <View style={[styles.catBarFill, { width: `${cat.pct}%`, backgroundColor: cat.color }]} />
                    </View>
                    <Text style={styles.catAmount}>₹{cat.amount?.toLocaleString('en-IN')}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.weekMiniRow}>
                <View style={[styles.weekMiniCard, { backgroundColor: Colors.PRIMARY_BG }]}>
                  <Text style={styles.weekMiniLabel}>This week</Text>
                  <Text style={styles.weekMiniAmount}>₹3,200</Text>
                  <Text style={styles.weekMiniDiff}>▲ 14% more</Text>
                </View>
                <View style={[styles.weekMiniCard, { backgroundColor: Colors.SURFACE }]}>
                  <Text style={styles.weekMiniLabel}>Last week</Text>
                  <Text style={styles.weekMiniAmount}>₹2,800</Text>
                  <Text style={[styles.weekMiniDiff, { color: Colors.TEXT_MUTED }]}>baseline</Text>
                </View>
              </View>
              <View style={styles.insightCard}>
                <Text style={styles.insightLabel}>Top insight</Text>
                <Text style={styles.insightMain}>Food is your biggest expense</Text>
                <Text style={styles.insightSub}>Consider meal prepping to reduce food costs</Text>
              </View>
            </>
          )}

          {activeTab === 1 && (
            <>
              <View style={styles.summaryRow}>
                <View style={[styles.summaryCard, { backgroundColor: Colors.PRIMARY_BG }]}>
                  <Text style={styles.summaryLabel}>This week</Text>
                  <Text style={styles.summaryAmount}>₹3,200</Text>
                  <Text style={[styles.summaryDiff, { color: Colors.DANGER }]}>▲ 14% more</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: Colors.SURFACE }]}>
                  <Text style={styles.summaryLabel}>Last week</Text>
                  <Text style={styles.summaryAmount}>₹2,800</Text>
                  <Text style={[styles.summaryDiff, { color: Colors.TEXT_MUTED }]}>baseline</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: Colors.SURFACE }]}>
                  <Text style={styles.summaryLabel}>Difference</Text>
                  <Text style={[styles.summaryAmount, { color: Colors.DANGER }]}>+₹400</Text>
                  <Text style={[styles.summaryDiff, { color: Colors.TEXT_MUTED }]}>overspent</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Daily comparison</Text>
                <View style={styles.legend}>
                  <View style={[styles.legendDot, { backgroundColor: Colors.PRIMARY_MID }]} />
                  <Text style={styles.legendText}>This week</Text>
                  <View style={[styles.legendDot, { backgroundColor: '#D3D1C7', marginLeft: 12 }]} />
                  <Text style={styles.legendText}>Last week</Text>
                </View>
                <View style={styles.chartArea}>
                  <View style={styles.yAxis}>
                    {['₹800', '₹600', '₹400', '₹200', '₹0'].map(l => (
                      <Text key={l} style={styles.yLabel}>{l}</Text>
                    ))}
                  </View>
                  <View style={styles.barsArea}>
                    {DAILY.map((d, i) => (
                      <View key={i} style={styles.dayGroup}>
                        <View style={styles.barPair}>
                          <View style={[styles.groupBar, { height: (d.tw / maxBar) * 120, backgroundColor: Colors.PRIMARY_MID }]} />
                          <View style={[styles.groupBar, { height: (d.lw / maxBar) * 120, backgroundColor: '#D3D1C7' }]} />
                        </View>
                        <Text style={styles.dayLabel}>{d.day}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={[styles.cardTitle, { color: Colors.PRIMARY }]}>Category breakdown</Text>
                {CAT_BREAKDOWN.map((c, i) => (
                  <View key={i} style={styles.breakdownRow}>
                    <View style={styles.breakdownIcon}><Text style={{ fontSize: 16 }}>{c.icon}</Text></View>
                    <View style={styles.breakdownCenter}>
                      <Text style={styles.breakdownName}>{c.name}</Text>
                      <Text style={[styles.breakdownDiff, { color: c.diff.startsWith('-') ? Colors.SUCCESS : c.diffUp ? Colors.DANGER : Colors.TEXT_MUTED }]}>{c.diff}</Text>
                      <View style={[styles.miniBar, { width: c.twBar, backgroundColor: Colors.PRIMARY_MID }]} />
                      <View style={[styles.miniBar, { width: c.lwBar, backgroundColor: '#D3D1C7', marginTop: 2 }]} />
                    </View>
                    <View style={styles.breakdownAmts}>
                      <Text style={styles.breakdownAmt}>₹{c.tw.toLocaleString('en-IN')}</Text>
                      <Text style={[styles.breakdownAmt, { color: Colors.TEXT_MUTED }]}>₹{c.lw.toLocaleString('en-IN')}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.smartCard}>
                <Text style={styles.smartLabel}>Smart tip</Text>
                <Text style={styles.smartMain}>Spent ₹320 more on food this week</Text>
                <Text style={styles.smartSub}>Mostly Fri–Sat. Try meal prepping on weekends.</Text>
              </View>
            </>
          )}

          {activeTab === 2 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Monthly Trend</Text>
              <Text style={styles.comingSoon}>Monthly trend data coming soon</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.SCREEN_BG },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  title: { fontSize: 20, fontWeight: '700', color: Colors.TEXT_PRIMARY },
  monthPill: { backgroundColor: Colors.PRIMARY_BG, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  monthText: { color: Colors.PRIMARY, fontSize: 12, fontWeight: '600' },
  tabRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 8 },
  tab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: Colors.TEXT_MUTED },
  tabActive: { backgroundColor: Colors.PRIMARY, borderColor: Colors.PRIMARY },
  tabText: { fontSize: 12, color: Colors.TEXT_MUTED },
  tabTextActive: { color: Colors.PRIMARY_BG, fontWeight: '600' },
  content: { paddingHorizontal: 16, paddingBottom: 96 },
  card: { backgroundColor: Colors.SURFACE, borderRadius: 14, padding: 14, marginBottom: 14 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: Colors.TEXT_PRIMARY, marginBottom: 12 },
  catRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  catName: { width: 70, fontSize: 12, color: Colors.TEXT_SECONDARY },
  catBarBg: { flex: 1, height: 8, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 4, marginHorizontal: 8 },
  catBarFill: { height: 8, borderRadius: 4 },
  catAmount: { fontSize: 12, color: Colors.TEXT_SECONDARY, width: 55, textAlign: 'right' },
  weekMiniRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  weekMiniCard: { flex: 1, borderRadius: 12, padding: 12 },
  weekMiniLabel: { fontSize: 11, color: Colors.TEXT_MUTED, marginBottom: 4 },
  weekMiniAmount: { fontSize: 16, fontWeight: '700', color: Colors.TEXT_PRIMARY },
  weekMiniDiff: { fontSize: 11, color: Colors.DANGER, marginTop: 2 },
  insightCard: { backgroundColor: Colors.PRIMARY_BG, borderRadius: 12, borderWidth: 1, borderColor: '#B5D4F4', padding: 14, marginBottom: 14 },
  insightLabel: { fontSize: 11, color: Colors.PRIMARY, marginBottom: 4 },
  insightMain: { fontSize: 14, fontWeight: '700', color: Colors.PRIMARY_DARK, marginBottom: 4 },
  insightSub: { fontSize: 12, color: Colors.PRIMARY },
  summaryRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  summaryCard: { flex: 1, borderRadius: 12, padding: 10 },
  summaryLabel: { fontSize: 10, color: Colors.TEXT_MUTED, marginBottom: 4 },
  summaryAmount: { fontSize: 14, fontWeight: '700', color: Colors.TEXT_PRIMARY },
  summaryDiff: { fontSize: 10, marginTop: 2 },
  legend: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  legendDot: { width: 10, height: 10, borderRadius: 2, marginRight: 4 },
  legendText: { fontSize: 11, color: Colors.TEXT_MUTED },
  chartArea: { flexDirection: 'row' },
  yAxis: { justifyContent: 'space-between', marginRight: 6, height: 140 },
  yLabel: { fontSize: 9, color: Colors.TEXT_MUTED },
  barsArea: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', height: 140 },
  dayGroup: { flex: 1, alignItems: 'center' },
  barPair: { flexDirection: 'row', alignItems: 'flex-end', gap: 2 },
  groupBar: { width: 8, borderRadius: 3 },
  dayLabel: { fontSize: 9, color: Colors.TEXT_MUTED, marginTop: 4 },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  breakdownIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: Colors.PRIMARY_BG, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  breakdownCenter: { flex: 1 },
  breakdownName: { fontSize: 13, fontWeight: '600', color: Colors.TEXT_PRIMARY },
  breakdownDiff: { fontSize: 11, marginBottom: 4 },
  miniBar: { height: 5, borderRadius: 3 },
  breakdownAmts: { alignItems: 'flex-end' },
  breakdownAmt: { fontSize: 12, fontWeight: '600', color: Colors.TEXT_PRIMARY },
  smartCard: { backgroundColor: Colors.PRIMARY_DARK, borderRadius: 14, padding: 16, marginBottom: 14 },
  smartLabel: { fontSize: 11, color: Colors.PRIMARY_MID, marginBottom: 6 },
  smartMain: { fontSize: 14, fontWeight: '700', color: Colors.PRIMARY_BG, marginBottom: 4 },
  smartSub: { fontSize: 12, color: Colors.PRIMARY },
  comingSoon: { color: Colors.TEXT_MUTED, fontSize: 13, textAlign: 'center', paddingVertical: 20 },
});

export default InsightsScreen;
