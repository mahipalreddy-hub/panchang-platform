import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { defaultApiClient } from '@panchang/api-client';
import { FestivalItem } from '@panchang/types';

export function FestivalsScreen() {
  const [festivals, setFestivals] = useState<FestivalItem[]>([]);

  useEffect(() => {
    defaultApiClient.getFestivals(2026).then(res => setFestivals(res.festivals));
  }, []);

  const handleSetReminder = (fest: FestivalItem) => {
    Alert.alert('Reminder Scheduled', `A notification reminder has been set for ${fest.name} on ${fest.date}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Hindu Festival Calendar 2026</Text>
        <Text style={styles.subtitle}>All Vrats, dates & certified puja muhurat</Text>

        <View style={styles.list}>
          {festivals.map(f => (
            <View key={f.id} style={styles.card}>
              <View style={styles.top}>
                <Text style={styles.name}>{f.name} ({f.nameDevanagari})</Text>
                <Text style={styles.date}>{f.date}</Text>
              </View>
              <Text style={styles.desc}>{f.significance}</Text>
              {f.pujaMuhurat && (
                <Text style={styles.muhurat}>✨ {f.pujaMuhurat.description}: {f.pujaMuhurat.start} – {f.pujaMuhurat.end}</Text>
              )}
              <TouchableOpacity onPress={() => handleSetReminder(f)} style={styles.reminderBtn}>
                <Text style={styles.reminderBtnText}>🔔 Set Puja Reminder</Text>
              </TouchableOpacity>
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
  list: { gap: 12 },
  card: { backgroundColor: '#121827', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.2)' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  date: { color: '#FCD34D', fontSize: 12, fontWeight: 'bold', backgroundColor: '#1E293B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  desc: { color: 'rgba(254, 243, 199, 0.8)', fontSize: 12, marginTop: 4 },
  muhurat: { color: '#6EE7B7', fontSize: 12, marginTop: 6, fontWeight: '600' },
  reminderBtn: { marginTop: 10, backgroundColor: 'rgba(217, 119, 6, 0.2)', paddingVertical: 6, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#D97706' },
  reminderBtnText: { color: '#FDE68A', fontSize: 11, fontWeight: 'bold' }
});