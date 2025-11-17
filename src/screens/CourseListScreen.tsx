// src/screens/CourseListScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

// Nossos componentes e tipos
import { CourseCard } from '../components/CourseCard';
import { CategoryChip } from '../components/CategoryChip';
import { IncentiveModal } from '../components/IncentiveModal'; // NOVO: Importa o modal
import { Course } from '../types/Course';
import { Category } from '../types/Category';
import { RootStackParamList } from '../types/Navigation';

import Animated, { FadeInUp } from 'react-native-reanimated'; // <<< NOVO IMPORT

// Importando tipos de navegação
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// --- MOCK DATA (com nossos tipos) ---
const MOCK_CATEGORIES: Category[] = [ // Tipado!
  { id: '1', title: 'Tecnologia' },
  { id: '2', title: 'Negócios' },
  { id: '3', title: 'Design' },
  { id: '4', title: 'Finanças' },
];

const MOCK_COURSES: Course[] = [ // Tipado!
  {
    id: 'c1',
    title: 'Java: Do Zero ao Profissional',
    description: 'Aprenda a base do nosso backend.',
    category: 'Tecnologia',
    imageUri: 'https://images-na.ssl-images-amazon.com/images/I/61iYrnfAd5L._AC_UL600_SR600,600_.jpg',
    carga_horaria: 80, 
    dificuldade: 'Intermediário',
  },
  // ... (outros cursos)
];
// --- FIM MOCK DATA ---

// Definindo o tipo das props que esta tela recebe do React Navigation
type Props = NativeStackScreenProps<RootStackParamList, 'CourseList'>;

export const CourseListScreen: React.FC<Props> = ({ navigation }) => {
  // Tipando os 'useStates'
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('1');

  // NOVO: Estado para controlar o modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // UseEffect para carregar os cursos
  useEffect(() => {
    setTimeout(() => {
      setCourses(MOCK_COURSES);
      setIsLoading(false);
    }, 1500);
  }, []);

  // NOVO: UseEffect para disparar o modal (simulação)
  useEffect(() => {
    // Apenas um exemplo: abre o modal 5s após a tela carregar
    const timer = setTimeout(() => {
      // No app real, checaríamos: "se o usuário NÃO tem perfil..."
      setIsModalVisible(true);
    }, 5000);

    // Limpa o timer se o usuário sair da tela
    return () => clearTimeout(timer);
  }, []); // O array vazio [] garante que isso rode só uma vez

  
  // NOVO: Funções para controlar o modal
  const handleOpenProfile = () => {
    setIsModalVisible(false);
    // Navega para a tela de Login (precisa estar no RootNavigator)
    navigation.navigate('Login');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  if (isLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loaderText}>Carregando seus cursos...</Text>
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.greeting}>Olá, Usuário!</Text>
      <Text style={styles.subGreeting}>O que vamos aprender hoje?</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} />
        <TextInput
          placeholder="Buscar cursos..."
          placeholderTextColor={COLORS.textSecondary}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <FlatList
        data={MOCK_CATEGORIES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryChip
            text={item.title}
            isActive={item.id === selectedCategory}
            onPress={() => setSelectedCategory(item.id)}
          />
        )}
      />
      
      <Text style={styles.sectionTitle}>Cursos Populares</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            imageUri={item.imageUri}
            // Navegação tipada! O TS sabe que 'DetalhesCurso' espera 'courseId'
            onPress={() => 
              navigation.navigate('DetalhesCurso', { courseId: item.id })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      
      {/* NOVO: Componente do Modal renderizado aqui */}
      <IncentiveModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onPrimaryAction={handleOpenProfile}
      />
    </SafeAreaView>
  );
};

// --- ESTILOS (permanecem os mesmos) ---
const styles = StyleSheet.create({
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
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    color: COLORS.textPrimary,
    fontFamily: 'Inter_700Bold', 
  },
  subGreeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular', 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 10,
    marginBottom: 15,
  },
});