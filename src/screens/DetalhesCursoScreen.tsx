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
    imageUri: 'https://example.com/images/java-course.jpg',
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