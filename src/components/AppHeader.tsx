import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: any;
  options?: any;
  back?: any;
};

export const AppHeader: React.FC<Props> = ({ navigation, options }) => {
  const title = options?.title ?? 'SkillUp 🎓';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Login')}
          accessibilityLabel="Ir para Login"
        >
          <Ionicons name="person-circle-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.background,
    // extra top spacing to avoid iPhone notch / status bar overlap
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 12 : 0,
  },
  container: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'transparent',
  },
  title: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: 'Inter_700Bold',
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
  },
});