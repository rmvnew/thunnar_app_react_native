import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert('Erro', 'Por favor, preencha todos os campos');
        }

        // DEBUG: veja o que está sendo enviado
        console.log('Tentando login com:', { email, password });

        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token, refresh_token, user_id, name, profile, avatar } = response.data;

            await AsyncStorage.setItem('token', access_token);
            await AsyncStorage.setItem('refresh_token', refresh_token);
            await AsyncStorage.setItem('user', JSON.stringify({ user_id, name, profile, avatar }));

            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });

        } catch (error: any) {
            console.log('Login falhou:', error.response?.status, error.response?.data);

            // Se for 404, mostramos a mensagem retornada pelo servidor
            if (error.response?.status === 404) {
                return Alert.alert('Falha no login', error.response.data.message || 'Usuário ou senha inválidos');
            }

            // Outros erros
            Alert.alert('Erro', 'Falha ao tentar fazer login. Tente novamente.');
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Thunnar</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
    button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
