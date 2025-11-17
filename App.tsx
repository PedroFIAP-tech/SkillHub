// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold,} from '@expo-google-fonts/inter';
import { ActivityIndicator, View } from 'react-native'; // Para o loading da fonte

export default function App() {
  // --- CARREGA AS FONTES ---
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
        {/* O Statusbar no "Black Mode" fica melhor 'light' */}
        <StatusBar style="light" /> 
      </NavigationContainer>
    </SafeAreaProvider>
  );
}