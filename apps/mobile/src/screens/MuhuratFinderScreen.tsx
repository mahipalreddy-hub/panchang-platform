import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { defaultApiClient } from '@panchang/api-client';
import { MuhuratCategory, MuhuratWindow } from '@panchang/types';

export function MuhuratFinderScreen() {
  const [selectedType, setSelectedType] = useState<MuhuratCategory>('wedding');
  const [windows, setWindows] = useState<MuhuratWindow[]>([]);
  const [loading, setLoading] = useState(false);

  const categories: { id: MuhuratCategory; label: string; icon: string }[] = [
    { id: 'wedding', label: 'Vivah (Wedding)', icon: '💍' },
    { id: 'griha-pravesh', label: 'Griha Pravesh', icon: '🏡' },
    { id: 'vehicle-purchase', label: 'Vehicle Purchase', icon: '🚗' },
    { id: 'property-purchase', label: 'Property Buy', icon: '📜' },
    { id: 'business-opening', label: 'Business Start', icon: '🏬' }
  ];

  const fetchMuhurats = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    const future = new Date();
    future.setDate(future.getDate() + 60);
    const to = future.toISOString().split('T')[0];

    const data = await defaultApiClient.getMuhurat(selectedType, today, to, 'delhi');
    setWindows(data.windows);
    setLoading(false);
  };

  useEffect(() => {
    fetchMuhurats();
  }, [selectedType]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Shubh Muhurat Finder</Text>
        <Text style={styles.subtitle}>Select category to find certified auspicious dates</Text>

        {/* Category Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
          {categories.map(c => (
            <TouchableOpacity
              key={c.id}
              onPress={() => setSelectedType(c.id)}
              style={[styles.pill, selectedType === c.id && styles.pillActive]}
            >
              <Text style={styles.pillIcon}>{c.icon}</Text>
              <Text style={[styles.pillText, selectedType === c.id && styles.pillTextActive]}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}
        <Text style={styles.resultCount}>Found {windows.length} Auspicious Dates</Text>
        <View style={styles.cardsList}>
          {windows.map((win, i) => (
            <View key={i} style={styles.winCard}>
              <View style={styles.winTop}>
                <Text style={styles.winDate}>{win.date} ({win.dayOfWeek})</Text>
                <Text style={styles.winScore}>Score {win.score}/100</Text>
              </View>
              <Text style={styles.winTime}>⏰ {win.startTime} – {win.endTime} ({win.durationFormatted})</Text>
              <Text style={styles.winFactors}>✅ {win.favorableFactors.join(' • ')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080C14' },
  scroll: { padding: 16 },
  title: { color: '#FEF3C7', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: 'rgba(254, 243, 199, 0.7)', fontSize: 12, marginBottom: 14 },
  pillScroll: { marginBottom: 16 },
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#121827', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.2)' },
  pillActive: { backgroundColor: '#D97706', borderColor: '#F59E0B' },
  pillIcon: { marginRight: 6, fontSize: 14 },
  pillText: { color: '#FEF3C7', fontSize: 12 },
  pillTextActive: { color: '#FFF', fontWeight: 'bold' },
  resultCount: { color: '#FCD34D', fontSize: 13, fontWeight: '600', marginBottom: 10 },
  cardsList: { gap: 10 },
  winCard: { backgroundColor: '#121827', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.2)' },
  winTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  winDate: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  winScore: { color: '#6EE7B7', fontSize: 11, fontWeight: 'bold', backgroundColor: '#064E3B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  winTime: { color: '#FDE68A', fontSize: 13, fontWeight: '600', marginTop: 4 },
  winFactors: { color: 'rgba(254, 243, 199, 0.7)', fontSize: 11, marginTop: 6 }
});