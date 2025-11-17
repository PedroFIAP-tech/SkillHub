// src/navigation/index.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importamos nossos Tipos e Telas
import { RootStackParamList } from '../types/Navigation';
import { COLORS } from '../constants/colors';

// 2. IMPORTE TODAS AS TELAS AQUI
import { CourseListScreen } from '../screens/CourseListScreen';
import { LoginScreen } from '../screens/LoginScreen'; 
import { DetalhesCursoScreen } from '../screens/DetalhesCursoScreen';
import { ProgressoScreen } from '../screens/ProgressoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="CourseList"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 20 },
        headerShadowVisible: false,
        headerBackTitle: ' ', // Remove o texto do botão de voltar
      }}
    >
      
      {/* 3. GRUPO DE TELAS NORMAIS */}
      <Stack.Group>
        <Stack.Screen
          name="CourseList"
          component={CourseListScreen}
          options={{ title: 'SkillUp 🎓' }}
        />
        
        <Stack.Screen
          name="DetalhesCurso"
          component={DetalhesCursoScreen}
          options={{ title: 'Detalhes do Curso' }}
        />

        <Stack.Screen
          name="Progresso"
          component={ProgressoScreen}
          options={{ title: 'Meu Progresso' }}
        /> 
        
      </Stack.Group>

      {/* 4. GRUPO DE TELAS MODAIS */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      
    </Stack.Navigator>
  );
};