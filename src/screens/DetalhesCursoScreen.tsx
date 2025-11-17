// src/screens/DetalhesCursoScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { Course } from '../types/Course'; // Agora este tipo está CORRETO
import { COLORS } from '../constants/colors';
import { PrimaryButton } from '../components/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';

// --- MOCK DATA (Agora bate 100% com a interface) ---
const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Java: Do Zero ao Profissional',
    description: 'Aprenda a construir APIs robustas com Spring Boot, conectar-se a bancos Oracle e preparar seu backend para o mercado. Este curso cobre desde a sintaxe básica até o deploy na nuvem.',
    category: 'Tecnologia',
    imageUri: 'data:image/jpeg;base64,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',
    carga_horaria: 80, 
    dificuldade: 'Intermediário',
  },
  // ... (outros cursos)
];
// --- FIM MOCK DATA ---

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhesCurso'>;

export const DetalhesCursoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { courseId } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null); // Tipo correto

  useEffect(() => {
    console.log(`Buscando dados para o curso ID: ${courseId}`);
    
    setTimeout(() => {
      const foundCourse = MOCK_COURSES.find(c => c.id === courseId);
      
      if (foundCourse) {
        // --- CORREÇÃO AQUI ---
        // Removemos o 'as any'. Agora o TypeScript entende.
        setCourse(foundCourse); 
      } else {
        console.error('Curso não encontrado!');
      }
      setIsLoading(false);
    }, 1000);
  }, [courseId]);

  const handleEnroll = () => {
    console.log(`Inscrição no curso ${course?.title}`);
    navigation.navigate('Progresso'); 
  };
  
  // --- CORREÇÃO AQUI (Tipo do Ícone) ---
  // Corrigindo o 'any' para o tipo correto do Ionicons
  const InfoChip: React.FC<{ 
    icon: React.ComponentProps<typeof Ionicons>['name']; 
    text: string 
  }> = ({ icon, text }) => (
    <View style={styles.chip}>
      <Ionicons name={icon} size={18} color={COLORS.primary} />
      <Text style={styles.chipText}>{text}</Text>
    </View>
  );

  if (isLoading || !course) {
    // ... (Loader continua igual)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: course.imageUri }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{course.title}</Text>
          
          <View style={styles.chipsContainer}>
            {/* Agora o TypeScript sabe que 'course.carga_horaria' existe */}
            <InfoChip icon="time-outline" text={`${course.carga_horaria} horas`} />
            <InfoChip icon="barbell-outline" text={course.dificuldade} />
            <InfoChip icon="folder-outline" text={course.category} />
          </View>
          
          <Text style={styles.sectionTitle}>Sobre o Curso</Text>
          <Text style={styles.description}>{course.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {/* ... (Botão continua igual) */}
        <PrimaryButton
          label="Inscrever-se no Curso"
          onPress={handleEnroll}
          iconName="checkmark-circle-outline"
        />
      </View>
    </View>
  );
};

// ... (Estilos continuam iguais)
const styles = StyleSheet.create({
// ...
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  image: {
    width: width,
    height: width * 0.6,
    resizeMode: 'cover',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.card,
  },
});