// src/types/Navigation.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/*
  Aqui definimos TODAS as telas que o nosso Stack Navigator 
  (o navegador principal) vai controlar.
  
  Para telas que não recebem parâmetros (como a Lista), usamos 'undefined'.
  Para telas que recebem (como Detalhes), definimos o formato do parâmetro.
*/
export type RootStackParamList = {
  Login: undefined; 
  CourseList: undefined;
  
  // A tela 'DetalhesCurso' DEVE receber um objeto 
  // com a chave 'courseId' (que é uma string)
  DetalhesCurso: { courseId: string }; 
  
  Progresso: undefined;
  Perfil: undefined;

  // --- Telas de Navegação Agrupadas ---
  // Podemos usar isso depois para agrupar as telas de Login/Cadastro
  Auth: undefined; 
  // E as telas principais do app (logado)
  AppTabs: undefined; 
};


/*
  Este é um tipo "helper" (auxiliar) que vamos usar 
  nas nossas telas para não ter que digitar o 
  'NativeStackScreenProps' toda vez.
*/
export type ScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;