import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'http://localhost:3000/api/v1';

export default function BoardsScreen({ navigation }: any) {
  const { user, token, logout } = useAuth();
  const { theme, themeName, setTheme } = useTheme();
  const [boards, setBoards] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBoards = async () => {
    try {
      const res = await axios.get(`${API_URL}/boards`, { headers: { Authorization: `Bearer ${token}` } });
      setBoards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { loadBoards(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBoards();
    setRefreshing(false);
  };

  const cycleTheme = () => {
    const order: any[] = ['light', 'dark'];
    if (user?.subscription_type === 'mutant') order.push('mutant');
    const next = order[(order.indexOf(themeName) + 1) % order.length];
    setTheme(next);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.primary }}>TaskForge</Text>
            {user?.subscription_type === 'mutant' && (
              <Text style={{ fontSize: 11, color: '#e31c25', fontWeight: '600' }}>MUTANT</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity onPress={cycleTheme}><Text style={{ color: theme.muted, fontSize: 13 }}>Tema</Text></TouchableOpacity>
            <TouchableOpacity onPress={logout}><Text style={{ color: theme.muted, fontSize: 13 }}>Sair</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Meus Boards</Text>

        {boards.map((board) => (
          <TouchableOpacity key={board.id} onPress={() => navigation.navigate('BoardDetail', { boardId: board.id })}
            style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: theme.border }}>
            <View style={{ height: 4, borderRadius: 2, backgroundColor: board.color || theme.primary, marginBottom: 12 }} />
            <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16 }}>{board.title}</Text>
          </TouchableOpacity>
        ))}

        {boards.length === 0 && (
          <Text style={{ color: theme.muted, textAlign: 'center', marginTop: 40 }}>Nenhum board ainda</Text>
        )}
      </ScrollView>
    </View>
  );
}
