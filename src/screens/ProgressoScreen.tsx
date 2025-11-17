// src/screens/ProgressoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const ProgressoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Progresso</Text>
      <Text style={styles.subtext}>Em breve, seus cursos inscritos...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    color: COLORS.textPrimary,
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
  },
  subtext: {
    color: COLORS.textSecondary,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginTop: 10,
  }
});