// src/components/PrimaryButton.tsx
import React, { useState } from 'react'; // NOVO: importar useState
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient'; // NOVO: Importar
import { Ionicons } from '@expo/vector-icons'; // NOVO: Para ícones

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  iconName?: React.ComponentProps<typeof Ionicons>['name']; // NOVO: Ícone
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  isLoading = false,
  disabled = false,
  iconName,
}) => {
  // NOVO: Estado para a micro-interação
  const [isPressed, setIsPressed] = useState(false);

  // Define os estilos dinâmicos de "pressão" e "desabilitado"
  const getDynamicStyle = () => {
    if (disabled || isLoading) {
      return styles.buttonDisabled;
    }
    if (isPressed) {
      return styles.buttonPressed; // Estilo quando "afundado"
    }
    return styles.buttonActive; // Estilo normal
  };

  return (
    <TouchableOpacity
      style={[styles.touchableBase, getDynamicStyle()]} // Aplicamos o estilo dinâmico aqui
      onPress={onPress}
      disabled={disabled || isLoading}
      // NOVO: Controla a micro-interação
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={1} // Desligamos o 'opacity' padrão
    >
      <LinearGradient
        // As cores do nosso gradiente "tech"
        colors={['#1A8CFF', COLORS.primary]} // Um azul mais claro para o azul principal
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.background} />
        ) : (
          <View style={styles.content}>
            {/* Ícone opcional (muito "tech") */}
            {iconName && (
              <Ionicons
                name={iconName}
                size={20}
                color={COLORS.background}
                style={styles.icon}
              />
            )}
            <Text style={styles.buttonText}>{label}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableBase: {
    width: '100%',
    borderRadius: 15, // Bordas mais redondas "tech"
    height: 55, // Um pouco mais alto
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra/Glow (o "pulo do gato")
    shadowColor: COLORS.primary, // Sombra com a cor do botão!
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Elevação para Android
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // --- Estilos Dinâmicos ---
  buttonActive: {
    // Estado normal
    transform: [{ scale: 1 }],
  },
  buttonPressed: {
    // NOVO: Efeito de "afundar"
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.1, // Diminui o glow ao pressionar
    elevation: 2,
  },
  buttonDisabled: {
    // Estado desabilitado
    shadowOpacity: 0, // Sem glow
    elevation: 0,
    backgroundColor: COLORS.textSecondary, // Cor sólida
  },
});