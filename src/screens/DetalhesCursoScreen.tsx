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
    imageUri: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    carga_horaria: 80, 
    dificuldade: 'Intermediário',
  },{
    id: 'c2',
    title: 'React Native: Do Zero ao App',
    description: 'Domine o desenvolvimento mobile criando apps completos para Android e iOS. Componentes, navegação, APIs e tudo para lançar seu primeiro aplicativo.',
    category: 'Programação',
    imageUri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    carga_horaria: 12,
    dificuldade: 'Intermediário',
  },
  {
    id: 'c3',
    title: 'Introdução a Marketing Digital',
    description: 'Aprenda SEO, redes sociais, funil de conversão e estratégias para crescer qualquer projeto online, mesmo começando do zero.',
    category: 'Marketing',
    imageUri: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546',
    carga_horaria: 6,
    dificuldade: 'Iniciante',
  },
  {
    id: 'c4',
    title: 'Python para Data Science',
    description: 'Aprenda análise de dados com Python usando Pandas, NumPy e visualizações. Trabalhe com datasets reais e gere insights profissionais.',
    category: 'Dados',
    imageUri: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    carga_horaria: 10,
    dificuldade: 'Intermediário',
  },
  {
    id: 'c5',
    title: 'Comunicação Eficaz',
    description: 'Aprenda técnicas para falar melhor, se expressar com clareza e transmitir ideias de forma profissional em qualquer situação.',
    category: 'Soft Skills',
    imageUri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    carga_horaria: 2,
    dificuldade: 'Iniciante',
  },
  {
    id: 'c6',
    title: 'SQL Essencial',
    description: 'Aprenda a consultar bancos de dados usando SELECT, JOINs, filtros e otimização. Essencial para quem trabalha com dados.',
    category: 'Dados',
    imageUri: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    carga_horaria: 5,
    dificuldade: 'Intermediário',
  },
  {
    id: 'c7',
    title: 'Design de Interfaces com Figma',
    description: 'Aprenda a criar interfaces profissionais usando Figma: wireframes, auto-layout, componentes e prototipagem.',
    category: 'Design',
    imageUri: 'https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg',
    carga_horaria: 3,
    dificuldade: 'Iniciante',
  },
  {
    id: 'c8',
    title: 'Node.js e APIs REST',
    description: 'Aprenda a criar APIs escaláveis com Node.js e Express. Rotas, middlewares, autenticação e boas práticas.',
    category: 'Programação',
    imageUri: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    carga_horaria: 8,
    dificuldade: 'Intermediário',
  },
  {
    id: 'c9',
    title: 'Gestão Financeira Pessoal',
    description: 'Aprenda a organizar seu dinheiro, montar orçamento, controlar gastos e entender os primeiros passos dos investimentos.',
    category: 'Finanças',
    imageUri: 'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg',
    carga_horaria: 2,
    dificuldade: 'Iniciante',
  },
  {
    id: 'c10',
    title: 'Copywriting para Conversão',
    description: 'Aprenda a criar textos persuasivos que vendem. Gatilhos mentais, técnicas de escrita e estrutura para anúncios e páginas de venda.',
    category: 'Marketing',
    imageUri: 'https://images.pexels.com/photos/4610774/pexels-photo-4610774.jpeg',
    carga_horaria: 3,
    dificuldade: 'Intermediário',
  },
  {
    id: 'c11',
    title: 'Liderança e Feedback',
    description: 'Desenvolva habilidades de liderança, aprenda a dar feedback de qualidade, gerir conflitos e motivar times.',
    category: 'Soft Skills',
    imageUri: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    carga_horaria: 4,
    dificuldade: 'Intermediário',
  },
  {
    id: 'c12',
    title: 'Machine Learning Básico',
    description: 'Entenda os algoritmos mais usados, como regressão e classificação, e aprenda a treinar modelos em Python com scikit-learn.',
    category: 'Dados',
    imageUri: 'https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg',
    carga_horaria: 9,
    dificuldade: 'Intermediário',
  }
  
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