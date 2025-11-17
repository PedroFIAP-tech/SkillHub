// src/components/CategoryChip.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

// Definindo os tipos das props que este componente espera
interface CategoryChipProps {
  text: string;
  isActive: boolean;
  onPress: () => void;
}

// Usamos React.FC (Functional Component) e passamos nossas props
export const CategoryChip: React.FC<CategoryChipProps> = ({ 
  text, 
  isActive, 
  onPress 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        isActive ? styles.chipActive : styles.chipInactive,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          isActive ? styles.textActive : styles.textInactive,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipInactive: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.card,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  textActive: {
    color: COLORS.background,
  },
  textInactive: {
    color: COLORS.textSecondary,
  },
});