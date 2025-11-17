// src/components/IncentiveModal.tsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

// Props que o Modal vai receber
interface IncentiveModalProps {
  visible: boolean;
  onClose: () => void; // Função para fechar o modal
  onPrimaryAction: () => void; // Função para o botão "Criar Perfil"
}

export const IncentiveModal: React.FC<IncentiveModalProps> = ({ 
  visible, 
  onClose,
  onPrimaryAction 
}) => {
  return (
    <Modal
      animationType="slide" // Desliza de baixo para cima
      transparent={true}    // Fundo transparente
      visible={visible}
      onRequestClose={onClose} // Permite fechar com o botão "voltar" do Android
    >
      {/* Backdrop escuro */}
      <View style={styles.backdrop}>
        
        {/* Conteúdo do Modal */}
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.content}>
            
            {/* Ícone de "Mágica" (IA) */}
            <Ionicons 
              name="sparkles" 
              size={50} 
              color={COLORS.primary} 
              style={styles.icon} 
            />
            
            {/* Título */}
            <Text style={styles.title}>Turbine seu Aprendizado!</Text>
            
            {/* Descrição */}
            <Text style={styles.description}>
              Crie um perfil gratuito para receber 
              recomendações de cursos e trilhas de aprendizado 
              feitas por IA, 100% personalizadas para você.
            </Text>
            
            {/* Botão Principal (CTA) */}
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onPrimaryAction}
            >
              <Text style={styles.primaryButtonText}>Criar Perfil Agora</Text>
            </TouchableOpacity>
            
            {/* Botão Secundário (Fechar) */}
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.secondaryButtonText}>Deixar para depois</Text>
            </TouchableOpacity>
            
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro semi-transparente
    justifyContent: 'flex-end', // Alinha o modal na parte de baixo
  },
  modalContainer: {
    backgroundColor: COLORS.background, // Fundo branco
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: COLORS.primary, // Nosso Azul
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: COLORS.background, // Branco
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: COLORS.textSecondary, // Cinza
    fontSize: 16,
    fontWeight: '500',
  },
});