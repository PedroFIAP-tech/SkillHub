// src/components/StyledInput.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, ViewStyle } from 'react-native'; // NOVO: Importar ViewStyle
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

// ... (Interface StyledInputProps permanece a mesma)
interface StyledInputProps {
  label: string;
  placeholder: string;
  isSecure?: boolean;
  error?: string;
  onChangeText: (text: string) => void;
  value: string;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
}


export const StyledInput: React.FC<StyledInputProps> = ({
  label,
  placeholder,
  isSecure = false,
  error,
  onChangeText,
  value,
  iconName,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // NOVO: Lógica de estilo dinâmico
  const getContainerStyle = (): ViewStyle => {
    // Estilo base
    const style: ViewStyle = {
      ...styles.inputContainer,
      borderColor: COLORS.card, // Borda neutra
    };

    if (error) {
      style.borderColor = COLORS.error; // Borda de erro
    } else if (isFocused) {
      // O "Glow" Mágico!
      style.borderColor = COLORS.primary; // Borda azul
      style.shadowColor = COLORS.primary; // Sombra/Glow azul
      style.shadowOffset = { width: 0, height: 0 };
      style.shadowOpacity = 0.5;
      style.shadowRadius = 4;
      style.elevation = 8; // Elevação para Android
    }
    
    return style;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {/* Aplicamos o estilo dinâmico aqui */}
      <View style={getContainerStyle()}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={isFocused ? COLORS.primary : COLORS.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={isSecure}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card, // Fundo branco (mais premium que cinza)
    borderRadius: 15, // Bordas mais redondas
    borderWidth: 2, // Borda mais grossa
    paddingHorizontal: 15,
    height: 55, // Mesma altura do botão
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});