// src/types/Course.ts

// Esta interface define o "contrato" de como é um Curso
// A API Java deve retornar os dados exatamente neste formato
export interface Course {
  id: string;        // Ou number, dependendo do seu banco Oracle
  title: string;
  description: string;
  category: string;    // Ou talvez um objeto Category? Por enquanto, string.
  imageUri: string;    // URL da imagem do curso
  carga_horaria: number; 
  dificuldade: string;
  // ---
  // Podemos adicionar mais campos que virão da API, por exemplo:
  // totalModules: number;
  // hours: number;
  // instructorName?: string; // O '?' torna o campo opcional
}