import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('demo@taskforge.app');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.error || 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.bg, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.primary, textAlign: 'center', marginBottom: 8 }}>TaskForge</Text>
      <Text style={{ color: theme.muted, textAlign: 'center', marginBottom: 40 }}>Organize seus projetos</Text>

      <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={theme.muted} autoCapitalize="none"
        style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 12, padding: 16, color: theme.text, marginBottom: 16 }} />

      <TextInput value={password} onChangeText={setPassword} placeholder="Senha" placeholderTextColor={theme.muted} secureTextEntry
        style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 12, padding: 16, color: theme.text, marginBottom: 24 }} />

      <TouchableOpacity onPress={handleLogin} disabled={loading}
        style={{ backgroundColor: theme.primary, padding: 16, borderRadius: 12, opacity: loading ? 0.6 : 1 }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 }}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>

      <Text style={{ color: theme.muted, textAlign: 'center', marginTop: 24, fontSize: 13 }}>demo@taskforge.app / 123456</Text>
    </KeyboardAvoidingView>
  );
}
