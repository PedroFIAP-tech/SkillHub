// src/types/Category.ts
export interface Category {
  id: string;
  title: string;
}

// src/types/Course.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUri: string;
}

// src/types/Navigation.ts
// (Vamos definir os tipos das nossas rotas aqui para o React Navigation)
export type RootStackParamList = {
  // Nomes das telas que ainda não estão autenticadas
  Auth: undefined; 
  // Nomes das telas que estão autenticadas (ex: navegação principal)
  App: undefined; 
  
  // Telas específicas
  Login: undefined;
  CourseList: undefined; // Nome que usaremos para a tela de lista
  DetalhesCurso: { courseId: string }; // Recebe um parâmetro 'courseId'
  Perfil: undefined;
  Progresso: undefined;
};