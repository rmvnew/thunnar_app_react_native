// src/screens/UsersScreen.tsx

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    RefreshControl
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    user_id: number;
    user_name: string;
    user_email: string;
    profile: { profile_name: string };
    created_at: string;
    status: boolean;
    company?: { company_name: string };
};

export default function UsersScreen({ navigation }: any) {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Busca de usuários
    const fetchUsers = async (p: number) => {
        setLoading(true);
        try {
            const resp = await api.get('/user', {
                params: { page: p, limit: 10, user_name: search || undefined },
            });
            const { items, meta } = resp.data;
            setTotalPages(meta.totalPages);
            setUsers(prev => (p === 1 ? items : [...prev, ...items]));
        } catch (err: any) {
            console.log('🔴 Erro ao buscar usuários:', err?.response?.status, err?.response?.data);

            if (err.response?.status === 401) {
                // Token expirado ou inválido, força logout
                await AsyncStorage.clear();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao carregar usuários' });
            }
        } finally {
            setLoading(false);
        }
    };


    // Efeito para page/search
    useEffect(() => {
        fetchUsers(page);
    }, [page, search]);

    // Pull-to-refresh
    const onRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        await fetchUsers(1);
        setRefreshing(false);
    };

    // Scroll infinito
    const loadMore = () => {
        if (page < totalPages && !loading) {
            setPage(prev => prev + 1);
        }
    };

    // Alterna status
    const handleToggleStatus = async (id: number, current: boolean) => {
        try {
            await api.patch(`/user/status/${id}`, { status: !current });
            setUsers(prev =>
                prev.map(u => (u.user_id === id ? { ...u, status: !current } : u))
            );
            Toast.show({ type: 'success', text1: 'Status atualizado' });
        } catch {
            Toast.show({ type: 'error', text1: 'Erro ao atualizar status' });
        }
    };

    // Deletar com confirmação
    const handleDelete = (id: number, name: string) => {
        Alert.alert(
            'Confirmar exclusão',
            `Deseja apagar ${name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Apagar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/user/${id}`);
                            setUsers(prev => prev.filter(u => u.user_id !== id));
                            Toast.show({ type: 'success', text1: 'Usuário apagado' });
                        } catch {
                            Toast.show({ type: 'error', text1: 'Erro ao apagar usuário' });
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        (async () => {
            const raw = await AsyncStorage.getItem('user');
            console.log('🟡 Dados do usuário armazenado:', raw);
        })();
    }, []);

    // Como renderizar cada item
    const renderItem = ({ item }: { item: User }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.user_name}</Text>
                <Text style={styles.email}>{item.user_email}</Text>
                <Text style={styles.meta}>
                    Perfil: {item.profile.profile_name} | Criado em:{' '}
                    {new Date(item.created_at).toLocaleDateString()}
                </Text>
                {item.company && (
                    <Text style={styles.meta}>Empresa: {item.company.company_name}</Text>
                )}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={() => handleToggleStatus(item.user_id, item.status)}
                >
                    <MaterialIcons
                        name={item.status ? 'toggle-on' : 'toggle-off'}
                        size={28}
                        color={item.status ? 'green' : 'gray'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => navigation.navigate('UserForm', { user: item })}
                >
                    <Feather name="edit" size={20} color="#4caf50" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => handleDelete(item.user_id, item.user_name)}
                >
                    <Feather name="trash-2" size={20} color="#f44336" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar usuário..."
                value={search}
                onChangeText={t => {
                    setSearch(t);
                    setPage(1);
                }}
            />

            <FlatList
                data={users}
                keyExtractor={u => u.user_id.toString()}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading ? <ActivityIndicator style={styles.loader} /> : null
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            <TouchableOpacity
                style={styles.fab}

                onPress={() => {

                    navigation.navigate('UserForm')
                }}
            >
                <Feather name="user-plus" size={24} color="#fff" />
            </TouchableOpacity>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    searchInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
    info: { flex: 1 },
    name: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
    email: { color: '#555', marginBottom: 4 },
    meta: { color: '#777', fontSize: 12 },
    actions: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginLeft: 12 },
    loader: { marginVertical: 10 },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 10,
        backgroundColor: '#007bff',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        marginBottom: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4
    }
});
