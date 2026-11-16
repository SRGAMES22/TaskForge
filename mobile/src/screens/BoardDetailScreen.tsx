import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'http://localhost:3000/api/v1';

export default function BoardDetailScreen({ route, navigation }: any) {
  const { boardId } = route.params;
  const { token } = useAuth();
  const { theme } = useTheme();
  const [board, setBoard] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadBoard = async () => {
    try {
      const res = await axios.get(`${API_URL}/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBoard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { loadBoard(); }, [boardId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBoard();
    setRefreshing(false);
  };

  const toggleCardComplete = async (card: any) => {
    try {
      await axios.patch(`${API_URL}/cards/${card.id}`, { completed: !card.completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadBoard();
    } catch (err) {
      console.log(err);
    }
  };

  if (!board) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.bg }}>
        <Text style={{ color: theme.muted }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: theme.muted, marginBottom: 8 }}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>{board.title}</Text>
      </View>

      <ScrollView horizontal contentContainerStyle={{ padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}>
        {board.lists?.map((list: any) => (
          <View key={list.id} style={{ width: 280, marginRight: 12, backgroundColor: theme.card, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ color: theme.text, fontWeight: '600', marginBottom: 12 }}>{list.title}</Text>

            {list.cards?.map((card: any) => (
              <TouchableOpacity key={card.id} onPress={() => toggleCardComplete(card)}
                style={{ backgroundColor: theme.bg, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: theme.border, opacity: card.completed ? 0.6 : 1 }}>
                <Text style={{ color: theme.text, fontWeight: '500', textDecorationLine: card.completed ? 'line-through' : 'none' }}>{card.title}</Text>

                <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                  {card.priority === 'urgent' && <Text style={{ fontSize: 11, color: '#ef4444' }}>Urgente</Text>}
                  {card.priority === 'high' && <Text style={{ fontSize: 11, color: '#f97316' }}>Alta</Text>}
                  {card.due_date && <Text style={{ fontSize: 11, color: theme.muted }}>📅 {card.due_date}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
