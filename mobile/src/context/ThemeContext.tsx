import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeName = 'light' | 'dark' | 'mutant';

const themes = {
  light: { bg: '#f1f5f9', card: '#ffffff', text: '#0f172a', muted: '#64748b', primary: '#6366f1', border: '#e2e8f0' },
  dark: { bg: '#0f172a', card: '#1e293b', text: '#f1f5f9', muted: '#94a3b8', primary: '#818cf8', border: '#334155' },
  mutant: { bg: '#0a0a0a', card: '#1a0a0a', text: '#f5f5f5', muted: '#a1a1aa', primary: '#e31c25', secondary: '#ffd700', border: '#3f0a0a' },
};

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  useEffect(() => {
    AsyncStorage.getItem('taskforge-theme').then((stored) => {
      if (stored) setThemeName(stored as ThemeName);
    });
  }, []);

  const setTheme = async (name: ThemeName) => {
    setThemeName(name);
    await AsyncStorage.setItem('taskforge-theme', name);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
