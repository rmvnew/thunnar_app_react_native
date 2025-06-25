import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import api from '../services/api'; // se quiser buscar avatar no S3
import { CommonActions } from '@react-navigation/native';

interface User {
    user_id: number;
    name: string;
    profile: string;
    avatar: string;
}

const CustomDrawer = (props: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (!userData) {
                // Não force logout automático
                console.warn('Usuário não autenticado, mas não vamos redirecionar ainda');
                return;
            }

            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            if (parsedUser.avatar) {
                try {
                    const { data } = await api.post('/s3/path', { path: parsedUser.avatar });
                    setAvatarUrl(data.url);
                } catch {
                    console.warn('Erro ao buscar avatar no S3');
                    setAvatarUrl(null);
                }
            }
        };

        loadUser();
    }, []);


    const getUserInitials = (name: string) => {
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const handleLogout = async () => {
        await AsyncStorage.clear();

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });


    };


    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={styles.logoSection}>
                    <Image source={require('../../assets/logo_tunnar.png')} style={styles.logo} />
                    <Text style={styles.version}>Versão 0.9.6 - 06/2025</Text>
                </View>

                <DrawerItemList {...props} />
            </View>

            <View style={styles.footer}>
                <View style={styles.userCard}>
                    <View style={styles.avatar}>
                        {avatarUrl ? (
                            <Image source={{ uri: avatarUrl }} style={styles.avatarImg} />
                        ) : (
                            <Text style={styles.avatarText}>{getUserInitials(user?.name || 'U')}</Text>
                        )}
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
                        <Text style={styles.profile}>{user?.profile?.toUpperCase() || 'Perfil'}</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.logout}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>

    );
};

export default CustomDrawer;


const styles = StyleSheet.create({
    logoSection: {
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logo: {
        width: 180,
        height: 60,
        resizeMode: 'contain',
    },
    version: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },
    footer: {
        marginTop: 'auto',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        overflow: 'hidden',
    },
    avatarImg: {
        width: '100%',
        height: '100%',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
    },
    profile: {
        fontSize: 12,
        color: 'gray',
    },
    logout: {
        color: '#f44336',
        fontWeight: 'bold',
    },
});
