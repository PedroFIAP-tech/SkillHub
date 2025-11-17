// src/components/CourseCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

interface CourseCardProps {
  title: string;
  description: string;
  imageUri: string;
  onPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  description, 
  imageUri, 
  onPress 
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image source={{ uri: imageUri }} style={styles.cardImage} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});