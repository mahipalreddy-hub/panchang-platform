import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SettingsScreen() {
  const [dailyAlert, setDailyAlert] = useState(true);
  const [rahuAlert, setRahuAlert] = useState(true);

  const handleClearCache = async () => {
    await AsyncStorage.clear();
    Alert.alert('Cache Cleared', 'Local offline panchang data reset.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings & Notifications</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Daily 6:00 AM Panchang</Text>
              <Text style={styles.subLabel}>Morning tithi and auspicious times</Text>
            </View>
            <Switch value={dailyAlert} onValueChange={setDailyAlert} trackColor={{ true: '#D97706', false: '#334155' }} />
          </View>

          <View style={[styles.row, { borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 12, marginTop: 12 }]}>
            <View>
              <Text style={styles.label}>Rahu Kalam Warning</Text>
              <Text style={styles.subLabel}>Alert 15 mins before Rahu Kalam starts</Text>
            </View>
            <Switch value={rahuAlert} onValueChange={setRahuAlert} trackColor={{ true: '#D97706', false: '#334155' }} />
          </View>
        </View>

        <TouchableOpacity onPress={handleClearCache} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear Offline Cache</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080C14' },
  content: { padding: 16 },
  title: { color: '#FEF3C7', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#121827', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.2)' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  subLabel: { color: 'rgba(254, 243, 199, 0.6)', fontSize: 11, marginTop: 2 },
  clearBtn: { marginTop: 20, backgroundColor: '#7F1D1D', padding: 12, borderRadius: 10, alignItems: 'center' },
  clearText: { color: '#FEE2E2', fontWeight: 'bold', fontSize: 13 }
});