// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Importando nossos componentes
import { StyledInput } from '../components/StyledInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types/Navigation';

// Tipagem das props de navegação
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Função de Login (Simulação)
  const handleLogin = () => {
    setError(''); // Limpa erros antigos
    setIsLoading(true);

    // --- AQUI ENTRA O AXIOS (authService.login(email, password)) ---
    // Simulando uma chamada de API
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'user@skillup.com' && password === '123456') {
        // Sucesso!
        // TODO: Salvar o token no AuthContext e navegar
        console.log('Login com sucesso!');
        // Navega para a lista de cursos (apenas para teste)
        navigation.replace('CourseList'); // 'replace' impede o usuário de "voltar" para o login
      } else {
        // Erro
        setError('E-mail ou senha inválidos.');
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          {/* Logo (simulado) */}
          <Ionicons name="school" size={60} color={COLORS.primary} />
          <Text style={styles.title}>Bem-vindo ao SkillUp</Text>
          <Text style={styles.subtitle}>
            Faça login para continuar sua jornada.
          </Text>
        </View>

        <View style={styles.form}>
          {/* Mostra erro da API (se houver) */}
          {error && <Text style={styles.apiErrorText}>{error}</Text>}

          <StyledInput
            label="Seu E-mail"
            placeholder="exemplo@skillup.com"
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
          />

          <StyledInput
            label="Sua Senha"
            placeholder="********"
            iconName="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            isSecure={true}
          />

          <PrimaryButton
            label="Entrar"
            onPress={handleLogin}
            isLoading={isLoading}
            disabled={!email || !password} // Desabilita se os campos estiverem vazios
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => console.log('Ir para Cadastro')}>
            <Text style={styles.footerText}>
              Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  form: {
    width: '100%',
  },
  apiErrorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});