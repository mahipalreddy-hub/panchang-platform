import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodayPanchangScreen } from '../screens/TodayPanchangScreen';
import { MuhuratFinderScreen } from '../screens/MuhuratFinderScreen';
import { FestivalsScreen } from '../screens/FestivalsScreen';
import { CityPickerScreen } from '../screens/CityPickerScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F1420',
          borderTopColor: 'rgba(217, 119, 6, 0.2)',
          height: 60,
          paddingBottom: 8
        },
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: 'rgba(254, 243, 199, 0.5)'
      }}
    >
      <Tab.Screen name="Today" component={TodayPanchangScreen} options={{ tabBarLabel: 'Panchang' }} />
      <Tab.Screen name="Muhurat" component={MuhuratFinderScreen} options={{ tabBarLabel: 'Muhurat' }} />
      <Tab.Screen name="Festivals" component={FestivalsScreen} options={{ tabBarLabel: 'Festivals' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="CityPicker"
        component={CityPickerScreen}
        options={{ presentation: 'modal', headerShown: true, title: 'Choose City', headerStyle: { backgroundColor: '#0F1420' }, headerTintColor: '#FEF3C7' }}
      />
    </Stack.Navigator>
  );
}