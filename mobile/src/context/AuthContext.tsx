import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadToken(); }, []);

  const loadToken = async () => {
    const stored = await AsyncStorage.getItem('taskforge-token');
    if (stored) {
      setToken(stored);
      try {
        const res = await axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${stored}` } });
        setUser(res.data.user);
      } catch {
        await AsyncStorage.removeItem('taskforge-token');
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    await AsyncStorage.setItem('taskforge-token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('taskforge-token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
