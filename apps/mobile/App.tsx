import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';

const linking = {
  prefixes: ['panchang://', 'https://vedicpanchang.internal'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Today: 'panchang/:city?/:date?',
          Muhurat: 'muhurat/:type?',
          Festivals: 'festivals'
        }
      }
    }
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}