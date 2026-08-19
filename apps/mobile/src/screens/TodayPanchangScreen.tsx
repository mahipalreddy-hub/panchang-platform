import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { defaultApiClient } from '@panchang/api-client';
import { PanchangData, CityConfig } from '@panchang/types';
import { getCachedPanchang, saveCachedPanchang, getSavedCity } from '../services/storage';
import { scheduleDailyPanchangNotification, registerForPushNotificationsAsync } from '../services/notifications';

export function TodayPanchangScreen({ navigation }: any) {
  const [panchang, setPanchang] = useState<PanchangData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeChoghadiyaTab, setActiveChoghadiyaTab] = useState<'day' | 'night'>('day');

  const loadData = async () => {
    // 1. Fast offline cache load
    const cached = await getCachedPanchang();
    if (cached) setPanchang(cached);

    const savedCity = await getSavedCity();
    const citySlug = savedCity?.slug || 'delhi';
    const todayStr = new Date().toISOString().split('T')[0];

    try {
      const fresh = await defaultApiClient.getPanchang(citySlug, todayStr);
      setPanchang(fresh);
      await saveCachedPanchang(fresh);

      // Register notifications
      const hasPermission = await registerForPushNotificationsAsync();
      if (hasPermission) {
        await scheduleDailyPanchangNotification(fresh);
      }
    } catch (e) {
      // Offline fallback already handled by api-client
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (!panchang) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Vedic Panchang...</Text>
      </SafeAreaView>
    );
  }

  const choghadiyaSlots = activeChoghadiyaTab === 'day' ? panchang.choghadiya.day : panchang.choghadiya.night;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#D97706" />}
      >
        {/* Top Header Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroPreTitle}>Drik Ganita Vedic Almanac</Text>
              <Text style={styles.heroTitle}>{panchang.cityName} Panchang</Text>
              <Text style={styles.heroSubtitle}>
                {panchang.dayOfWeek} ({panchang.dayOfWeekDevanagari}) • {panchang.date}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('CityPicker')}
              style={styles.cityBtn}
            >
              <Text style={styles.cityBtnText}>📍 {panchang.cityName}</Text>
            </TouchableOpacity>
          </View>

          {/* Sun & Moon Times */}
          <View style={styles.sunRow}>
            <View style={styles.sunBox}>
              <Text style={styles.sunLabel}>🌅 Sunrise</Text>
              <Text style={styles.sunTime}>{panchang.solarLunar.sunrise}</Text>
            </View>
            <View style={styles.sunBox}>
              <Text style={styles.sunLabel}>🌇 Sunset</Text>
              <Text style={styles.sunTime}>{panchang.solarLunar.sunset}</Text>
            </View>
          </View>
        </View>

        {/* Rahu Kalam Alert Badge */}
        <View style={styles.rahuCard}>
          <Text style={styles.rahuTitle}>⚠️ Rahu Kalam (राहु काल)</Text>
          <Text style={styles.rahuTime}>
            {panchang.inauspicious.rahuKalam.start} – {panchang.inauspicious.rahuKalam.end}
          </Text>
          <Text style={styles.rahuDesc}>Inauspicious 90-min period. Avoid commencing new ventures.</Text>
        </View>

        {/* 5 Limbs (Pancha-Anga) */}
        <Text style={styles.sectionHeader}>Five Limbs of Panchang (पंचांग)</Text>
        <View style={styles.limbsGrid}>
          {/* Tithi */}
          <View style={styles.limbCard}>
            <Text style={styles.limbTag}>1. Tithi ({panchang.tithi.paksha})</Text>
            <Text style={styles.limbName}>{panchang.tithi.name} ({panchang.tithi.nameDevanagari})</Text>
            <Text style={styles.limbEnd}>Upto {panchang.tithi.endTime}</Text>
          </View>

          {/* Nakshatra */}
          <View style={styles.limbCard}>
            <Text style={styles.limbTag}>2. Nakshatra (Pada {panchang.nakshatra.pada})</Text>
            <Text style={styles.limbName}>{panchang.nakshatra.name} ({panchang.nakshatra.nameDevanagari})</Text>
            <Text style={styles.limbEnd}>Lord: {panchang.nakshatra.ruler} • Upto {panchang.nakshatra.endTime}</Text>
          </View>

          {/* Yoga */}
          <View style={styles.limbCard}>
            <Text style={styles.limbTag}>3. Yoga #{panchang.yoga.number}</Text>
            <Text style={styles.limbName}>{panchang.yoga.name} ({panchang.yoga.nameDevanagari})</Text>
            <Text style={styles.limbEnd}>Upto {panchang.yoga.endTime}</Text>
          </View>

          {/* Karana */}
          <View style={styles.limbCard}>
            <Text style={styles.limbTag}>4. Karana ({panchang.karana.type})</Text>
            <Text style={styles.limbName}>{panchang.karana.name} ({panchang.karana.nameDevanagari})</Text>
            <Text style={styles.limbEnd}>
              {panchang.karana.isBhadra ? '❌ Bhadra Active' : '✅ Bhadra Free'}
            </Text>
          </View>
        </View>

        {/* Abhijit Muhurat Card */}
        <View style={styles.abhijitCard}>
          <Text style={styles.abhijitTag}>✨ Highly Auspicious</Text>
          <Text style={styles.abhijitTitle}>Abhijit Muhurat (अभिजीत मुहूर्त)</Text>
          <Text style={styles.abhijitTime}>
            {panchang.auspicious.abhijitMuhurat.start} – {panchang.auspicious.abhijitMuhurat.end}
          </Text>
          <Text style={styles.abhijitDesc}>Universal 48-minute auspicious window for success in all ventures.</Text>
        </View>

        {/* Choghadiya Section */}
        <View style={styles.choghadiyaHeader}>
          <Text style={styles.sectionHeader}>Choghadiya (चौघड़िया)</Text>
          <View style={styles.tabButtons}>
            <TouchableOpacity
              onPress={() => setActiveChoghadiyaTab('day')}
              style={[styles.tabBtn, activeChoghadiyaTab === 'day' && styles.tabBtnActive]}
            >
              <Text style={styles.tabBtnText}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveChoghadiyaTab('night')}
              style={[styles.tabBtn, activeChoghadiyaTab === 'night' && styles.tabBtnActive]}
            >
              <Text style={styles.tabBtnText}>Night</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.choghadiyaGrid}>
          {choghadiyaSlots.map((slot, idx) => (
            <View key={idx} style={styles.slotCard}>
              <View style={styles.slotTop}>
                <Text style={styles.slotName}>{slot.name} ({slot.nameDevanagari})</Text>
                <Text style={[styles.slotBadge, slot.quality === 'best' || slot.quality === 'good' || slot.quality === 'gain' ? styles.badgeGood : styles.badgeBad]}>
                  {slot.quality}
                </Text>
              </View>
              <Text style={styles.slotTime}>{slot.start} – {slot.end}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080C14' },
  loadingContainer: { flex: 1, backgroundColor: '#080C14', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#FCD34D', fontSize: 16 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  heroCard: { backgroundColor: '#121827', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.3)', marginBottom: 16 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroPreTitle: { color: '#F59E0B', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  heroTitle: { color: '#FEF3C7', fontSize: 22, fontWeight: 'bold', marginTop: 2 },
  heroSubtitle: { color: 'rgba(254, 243, 199, 0.7)', fontSize: 12, marginTop: 2 },
  cityBtn: { backgroundColor: 'rgba(217, 119, 6, 0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#D97706' },
  cityBtnText: { color: '#FDE68A', fontSize: 12, fontWeight: '600' },
  sunRow: { flexDirection: 'row', gap: 10, marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(217, 119, 6, 0.15)' },
  sunBox: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: 10, borderRadius: 10 },
  sunLabel: { color: '#FCD34D', fontSize: 10, textTransform: 'uppercase' },
  sunTime: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 2 },
  rahuCard: { backgroundColor: 'rgba(127, 29, 29, 0.3)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#DC2626', marginBottom: 16 },
  rahuTitle: { color: '#FCA5A5', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  rahuTime: { color: '#FEF2F2', fontSize: 16, fontWeight: 'bold', marginTop: 2 },
  rahuDesc: { color: '#F87171', fontSize: 11, marginTop: 2 },
  sectionHeader: { color: '#FDE68A', fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 8 },
  limbsGrid: { gap: 8, marginBottom: 16 },
  limbCard: { backgroundColor: '#121827', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.2)' },
  limbTag: { color: '#F59E0B', fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  limbName: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginTop: 2 },
  limbEnd: { color: 'rgba(254, 243, 199, 0.6)', fontSize: 11, marginTop: 2 },
  abhijitCard: { backgroundColor: 'rgba(6, 78, 59, 0.3)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#059669', marginBottom: 16 },
  abhijitTag: { color: '#6EE7B7', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  abhijitTitle: { color: '#D1FAE5', fontSize: 16, fontWeight: 'bold', marginTop: 2 },
  abhijitTime: { color: '#A7F3D0', fontSize: 18, fontWeight: 'bold', marginTop: 2 },
  abhijitDesc: { color: '#6EE7B7', fontSize: 11, marginTop: 2 },
  choghadiyaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tabButtons: { flexDirection: 'row', backgroundColor: '#1E293B', borderRadius: 8, padding: 2 },
  tabBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  tabBtnActive: { backgroundColor: '#D97706' },
  tabBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  choghadiyaGrid: { gap: 8 },
  slotCard: { backgroundColor: '#121827', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.15)' },
  slotTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  slotName: { color: '#FEF3C7', fontSize: 14, fontWeight: 'bold' },
  slotBadge: { fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, textTransform: 'uppercase', fontWeight: 'bold' },
  badgeGood: { backgroundColor: '#064E3B', color: '#6EE7B7' },
  badgeBad: { backgroundColor: '#7F1D1D', color: '#FCA5A5' },
  slotTime: { color: 'rgba(254, 243, 199, 0.7)', fontSize: 12, marginTop: 4 }
});