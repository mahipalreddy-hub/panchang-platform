import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { INDIAN_CITIES } from '@panchang/astro-core';
import { saveCity } from '../services/storage';

export function CityPickerScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filtered = INDIAN_CITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase()) ||
    c.nameDevanagari.includes(search)
  );

  const handleSelect = async (city: any) => {
    await saveCity(city);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select City / Location</Text>
        <TextInput
          placeholder="Search Indian cities (e.g. Hyderabad, Delhi)..."
          placeholderTextColor="#78350F"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <FlatList
          data={filtered}
          keyExtractor={item => item.slug}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
              <Text style={styles.cityName}>📍 {item.name} ({item.nameDevanagari})</Text>
              <Text style={styles.cityState}>{item.state}, India</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080C14' },
  content: { padding: 16, flex: 1 },
  title: { color: '#FEF3C7', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  search: { backgroundColor: '#121827', color: '#FFF', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#D97706', marginBottom: 12 },
  item: { backgroundColor: '#121827', padding: 12, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(217, 119, 6, 0.15)' },
  cityName: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  cityState: { color: 'rgba(254, 243, 199, 0.6)', fontSize: 11, marginTop: 2 }
});