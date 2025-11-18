// src/screens/CourseListScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet,
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
    imageUri: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    carga_horaria: 80, 
    dificuldade: 'Intermediário',
  },
  {
    id: 'c2',
    title: 'React Native: Do Zero ao App',
    description: 'Crie apps móveis com React Native.',
    category: 'Tecnologia',
    imageUri: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
    carga_horaria: 12,
    dificuldade: 'Intermediário'
  },
  {
    id: 'c3',
    title: 'Introdução a Marketing Digital',
    description: 'SEO, redes sociais e CRO.',
    category: 'Tecnologia',
    imageUri: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
    carga_horaria: 6,
    dificuldade: 'Iniciante'
  },
  {
    id: 'c4',
    title: 'Python para Data Science',
    description: 'Pandas, NumPy e visualização.',
    category: 'Tecnologia',
    imageUri: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    carga_horaria: 10,
    dificuldade: 'Intermediário'
  },
  {
    id: 'c5',
    title: 'Comunicação Eficaz',
    description: 'Apresente ideias com clareza.',
    category: 'Marketing',
    imageUri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    carga_horaria: 2,
    dificuldade: 'Iniciante'
  },
  {
    id: 'c6',
    title: 'SQL Essencial',
    description: 'Consultas, joins e otimização.',
    category: 'Tecnologia',
    imageUri: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    carga_horaria: 5,
    dificuldade: 'Intermediário'
  },
  {
    id: 'c7',
    title: 'Design de Interfaces com Figma',
    description: 'Wireframes e componentes.',
    category: 'Marketing',
    imageUri: 'https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg',
    carga_horaria: 3,
    dificuldade: 'Iniciante'
  },
  {
    id: 'c8',
    title: 'Node.js e APIs REST',
    description: 'Construção de APIs escaláveis.',
    category: 'Programação',
    imageUri: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    carga_horaria: 8,
    dificuldade: 'Intermediário'
  },
  {
    id: 'c9',
    title: 'Gestão Financeira Pessoal',
    description: 'Orçamento e investimentos básicos.',
    category: 'Finanças',
    imageUri: 'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg',
    carga_horaria: 2,
    dificuldade: 'Iniciante'
  },
  {
    id: 'c10',
    title: 'Copywriting para Conversão',
    description: 'Escrita persuasiva para vendas.',
    category: 'Marketing',
    imageUri: 'https://images.pexels.com/photos/4610774/pexels-photo-4610774.jpeg',
    carga_horaria: 3,
    dificuldade: 'Intermediário'
  },
  {
    id: 'c11',
    title: 'Liderança e Feedback',
    description: 'Gerencie times e dê feedback.',
    category: 'Negócios',
    imageUri: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    carga_horaria: 4,
    dificuldade: 'Intermediário'
  },
  {
    id: 'c12',
    title: 'Machine Learning Básico',
    description: 'Algoritmos supervisionados.',
    category: 'Dados',
    imageUri: 'https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg',
    carga_horaria: 9,
    dificuldade: 'Intermediário'
  }
  
];


// Definindo o tipo das props que esta tela recebe do React Navigation
type Props = NativeStackScreenProps<RootStackParamList, 'CourseList'>;

export const CourseListScreen: React.FC<Props> = ({ navigation }) => {
  // Tipando os 'useStates'
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  // agora padrão 'all' para mostrar todos inicialmente
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenProfile = () => {
    setIsModalVisible(false);
    navigation.navigate('Login');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // categories + opção "Todos"
  const categoriesWithAll = useMemo(() => {
    return [{ id: 'all', title: 'Todos' }, ...MOCK_CATEGORIES];
  }, []);

  // Filtra os cursos conforme a categoria selecionada (usa o title da categoria)
  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'all') return courses;
    const catTitle = categoriesWithAll.find(c => c.id === selectedCategory)?.title;
    if (!catTitle) return courses;
    // filtro "mock" por matching de string
    return courses.filter(course => course.category === catTitle);
  }, [selectedCategory, courses, categoriesWithAll]);

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
        data={categoriesWithAll}
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
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            imageUri={item.imageUri}
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