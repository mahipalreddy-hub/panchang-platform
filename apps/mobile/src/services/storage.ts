import AsyncStorage from '@react-native-async-storage/async-storage';
import { PanchangData, CityConfig } from '@panchang/types';

const STORAGE_KEYS = {
  TODAY_PANCHANG: '@panchang:today_data',
  SELECTED_CITY: '@panchang:selected_city',
  NOTIFICATION_SETTINGS: '@panchang:notification_settings'
};

export async function getCachedPanchang(): Promise<PanchangData | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.TODAY_PANCHANG);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export async function saveCachedPanchang(data: PanchangData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TODAY_PANCHANG, JSON.stringify(data));
  } catch (e) {}
}

export async function getSavedCity(): Promise<CityConfig | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CITY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export async function saveCity(city: CityConfig): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CITY, JSON.stringify(city));
  } catch (e) {}
}